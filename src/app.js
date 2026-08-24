(function () {
  "use strict";

  const tour = window.YUZUKI_TOUR_DATA;
  const state = {
    currentNodeId: tour ? tour.startNode : null,
    viewer: null,
    isFallback: false,
    autoRotate: false,
    orientationActive: false,
    orientationStarting: false
  };

  const els = {
    tourTitle: document.getElementById("tourTitle"),
    routeProgress: document.getElementById("routeProgress"),
    panorama: document.getElementById("panorama"),
    fallback: document.getElementById("viewerFallback"),
    homeBtn: document.getElementById("homeBtn"),
    orientationBtn: document.getElementById("orientationBtn"),
    autoRotateBtn: document.getElementById("autoRotateBtn"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
    nodeZone: document.getElementById("nodeZone"),
    nodeTitle: document.getElementById("nodeTitle"),
    nodeSubtitle: document.getElementById("nodeSubtitle"),
    nodeDescription: document.getElementById("nodeDescription"),
    nodeStatus: document.getElementById("nodeStatus"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    nodeCount: document.getElementById("nodeCount"),
    nodeList: document.getElementById("nodeList"),
    miniMap: document.getElementById("miniMap"),
    disclaimer: document.getElementById("disclaimer"),
    errorBox: document.getElementById("errorBox")
  };

  if (!tour) {
    showError("tour-data.jsを読み込めませんでした。");
    return;
  }

  const nodesById = new Map(tour.nodes.map((node) => [node.id, node]));
  const routeIds = tour.nodes.map((node) => node.id);

  init();

  function init() {
    const validationErrors = validateTour();
    if (validationErrors.length > 0) {
      showError(validationErrors.join(" / "));
      return;
    }

    document.title = `${tour.title} | ${tour.subtitle}`;
    els.tourTitle.textContent = tour.title;
    els.disclaimer.textContent = tour.disclaimer;
    els.nodeCount.textContent = `${tour.nodes.length}地点`;

    renderNodeList();
    renderMiniMap();
    bindControls();
    initViewer();
    loadNode(tour.startNode);
  }

  function validateTour() {
    const errors = [];
    const ids = new Set();

    for (const node of tour.nodes) {
      if (ids.has(node.id)) {
        errors.push(`重複したノードIDがあります: ${node.id}`);
      }
      ids.add(node.id);
    }

    if (!ids.has(tour.startNode)) {
      errors.push(`開始ノードが見つかりません: ${tour.startNode}`);
    }

    for (const node of tour.nodes) {
      if (!Array.isArray(node.links)) {
        errors.push(`${node.id}のlinksが配列ではありません。`);
        continue;
      }

      for (const link of node.links) {
        if (!ids.has(link.target)) {
          errors.push(`${node.id}のリンク先が見つかりません: ${link.target}`);
        }
        if (link.direction !== "forward" && link.direction !== "back") {
          errors.push(`${node.id}から${link.target}へのdirectionが不正です。`);
        }
        for (const key of ["yaw", "pitch", "targetYaw", "targetPitch"]) {
          if (link[key] === undefined) {
            errors.push(`${node.id}から${link.target}への${key}が未設定です。`);
          }
        }
      }
    }

    return errors;
  }

  function initViewer() {
    if (!window.pannellum) {
      state.isFallback = true;
      els.panorama.classList.add("is-fallback");
      els.fallback.hidden = false;
      return;
    }

    try {
      state.viewer = window.pannellum.viewer("panorama", buildPannellumConfig(tour));
      els.fallback.hidden = true;
      els.panorama.classList.remove("is-fallback");

      state.viewer.on("scenechange", (sceneId) => {
        loadNode(sceneId, { fromSceneEvent: true });
      });

      setupOrientationControl();
    } catch (error) {
      state.isFallback = true;
      els.panorama.classList.add("is-fallback");
      els.fallback.hidden = false;
      showError(`Pannellumの初期化に失敗しました: ${error.message}`);
    }
  }

  function buildPannellumConfig(tourData) {
    const scenes = {};

    for (const node of tourData.nodes) {
      scenes[node.id] = {
        title: `${node.id} ${node.title}`,
        type: "equirectangular",
        panorama: node.image,
        yaw: node.initialYaw || 0,
        pitch: node.initialPitch || 0,
        hotSpots: node.links.map((link) => ({
          pitch: link.pitch,
          yaw: link.yaw,
          type: "scene",
          text: link.label,
          sceneId: link.target,
          targetYaw: link.targetYaw ?? "sameAzimuth",
          targetPitch: link.targetPitch ?? 0,
          cssClass:
            link.direction === "forward"
              ? "streetview-hotspot streetview-hotspot-forward"
              : "streetview-hotspot streetview-hotspot-back"
        }))
      };
    }

    return {
      default: {
        firstScene: tourData.startNode,
        sceneFadeDuration: 700,
        autoLoad: true,
        showZoomCtrl: true,
        showFullscreenCtrl: false,
        compass: true
      },
      scenes
    };
  }

  function bindControls() {
    els.prevBtn.addEventListener("click", goBack);
    els.nextBtn.addEventListener("click", goForward);
    els.homeBtn.addEventListener("click", () => loadNode(tour.startNode));
    els.orientationBtn?.addEventListener("click", toggleOrientation);
    els.fullscreenBtn.addEventListener("click", toggleFullscreen);
    els.autoRotateBtn.addEventListener("click", toggleAutoRotate);

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) {
          return;
        }

        const key = event.key.toLowerCase();
        if (key === "arrowup" || key === "arrowright" || key === "w") {
          event.preventDefault();
          goForward();
        } else if (key === "arrowdown" || key === "arrowleft" || key === "s") {
          event.preventDefault();
          goBack();
        } else if (key === "home") {
          event.preventDefault();
          loadNode(tour.startNode);
        } else if (key === "end") {
          event.preventDefault();
          loadNode(routeIds[routeIds.length - 1]);
        }
      },
      true
    );
  }

  function setupOrientationControl() {
    if (!els.orientationBtn || !state.viewer || !isMobileOrientationCandidate()) {
      return;
    }

    const supported = state.viewer.isOrientationSupported
      ? state.viewer.isOrientationSupported()
      : true;

    if (!supported) {
      return;
    }

    els.orientationBtn.hidden = false;
    updateOrientationButton(false);

    if (!requiresOrientationPermissionGesture()) {
      window.setTimeout(() => {
        startOrientation({ silent: true });
      }, 250);
    }
  }

  function isMobileOrientationCandidate() {
    const ua = navigator.userAgent || "";
    const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
    const isTouchMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return Boolean(window.DeviceOrientationEvent) && (isMobileUA || isTouchMac);
  }

  function requiresOrientationPermissionGesture() {
    return Boolean(
      window.DeviceMotionEvent &&
        typeof window.DeviceMotionEvent.requestPermission === "function"
    );
  }

  async function toggleOrientation() {
    if (!state.viewer || state.orientationStarting) {
      return;
    }

    if (isViewerOrientationActive()) {
      stopOrientation();
      return;
    }

    await startOrientation({ silent: false });
  }

  async function startOrientation({ silent }) {
    if (!state.viewer || state.orientationStarting) {
      return;
    }

    state.orientationStarting = true;
    els.orientationBtn.disabled = true;
    els.orientationBtn.textContent = requiresOrientationPermissionGesture()
      ? "スマホ連動 許可待ち…"
      : "スマホ連動 起動中…";

    if (state.autoRotate) {
      state.viewer.stopAutoRotate();
      state.autoRotate = false;
      updateAutoRotateButton();
    }

    try {
      state.viewer.startOrientation();
      const active = await waitForOrientationActive();
      state.orientationActive = active;
      updateOrientationButton(active);

      if (!active && !silent) {
        showError(
          "スマホ連動を開始できませんでした。iPhone / iPadではモーションと画面の向きへのアクセスを許可してから、もう一度「スマホ連動」を押してください。"
        );
      } else if (active) {
        clearError();
      }
    } catch (error) {
      state.orientationActive = false;
      updateOrientationButton(false);
      if (!silent) {
        showError(`スマホ連動の開始に失敗しました: ${error.message || error}`);
      }
    } finally {
      state.orientationStarting = false;
      els.orientationBtn.disabled = false;
    }
  }

  function waitForOrientationActive() {
    return new Promise((resolve) => {
      let checks = 0;
      const maxChecks = 24;

      const timer = window.setInterval(() => {
        checks += 1;
        if (isViewerOrientationActive()) {
          window.clearInterval(timer);
          resolve(true);
        } else if (checks >= maxChecks) {
          window.clearInterval(timer);
          resolve(false);
        }
      }, 100);
    });
  }

  function isViewerOrientationActive() {
    if (!state.viewer?.isOrientationActive) {
      return state.orientationActive;
    }
    return Boolean(state.viewer.isOrientationActive());
  }

  function stopOrientation() {
    state.viewer?.stopOrientation?.();
    state.orientationActive = false;
    updateOrientationButton(false);
  }

  function updateOrientationButton(active) {
    if (!els.orientationBtn) {
      return;
    }
    els.orientationBtn.setAttribute("aria-pressed", String(active));
    els.orientationBtn.classList.toggle("is-active", active);
    els.orientationBtn.textContent = active ? "スマホ連動 ON" : "スマホ連動";
  }

  function renderNodeList() {
    els.nodeList.replaceChildren();

    let currentArea = "";
    for (const node of tour.nodes) {
      if (node.area !== currentArea) {
        currentArea = node.area;
        const heading = document.createElement("div");
        heading.className = "route-group-heading";
        heading.textContent = currentArea;
        els.nodeList.append(heading);
      }

      const button = document.createElement("button");
      button.type = "button";
      button.className = "node-item";
      button.dataset.nodeId = node.id;
      button.addEventListener("click", () => loadNode(node.id));

      const thumb = document.createElement("img");
      thumb.src = node.thumb;
      thumb.alt = "";
      thumb.loading = "lazy";

      const copy = document.createElement("span");
      copy.className = "node-item-copy";

      const title = document.createElement("strong");
      title.textContent = `${node.id} ${node.title}`;

      const subtitle = document.createElement("span");
      subtitle.textContent = node.subtitle;

      copy.append(title, subtitle);
      button.append(thumb, copy);
      els.nodeList.append(button);
    }
  }

  function renderMiniMap() {
    els.miniMap.replaceChildren();

    let currentGroup = null;
    for (const node of tour.nodes) {
      if (!currentGroup || currentGroup.dataset.area !== node.area) {
        currentGroup = document.createElement("div");
        currentGroup.className = "map-group";
        currentGroup.dataset.area = node.area;

        const label = document.createElement("span");
        label.className = "map-group-label";
        label.textContent = node.area;
        currentGroup.append(label);
        els.miniMap.append(currentGroup);
      }

      const step = document.createElement("button");
      step.type = "button";
      step.className = "map-step";
      step.dataset.nodeId = node.id;
      step.textContent = String(getNodeIndex(node.id) + 1).padStart(2, "0");
      step.title = `${node.id} ${node.title}`;
      step.addEventListener("click", () => loadNode(node.id));
      currentGroup.append(step);
    }
  }

  function loadNode(nodeId, options = {}) {
    const node = nodesById.get(nodeId);
    if (!node) {
      showError(`指定された地点が見つかりません: ${nodeId}`);
      return;
    }

    state.currentNodeId = node.id;
    clearError();

    if (state.viewer && !options.fromSceneEvent) {
      const activeScene = state.viewer.getScene ? state.viewer.getScene() : null;
      const orientation = resolveTargetOrientation(node, options.link);

      if (activeScene !== node.id) {
        state.viewer.loadScene(node.id, orientation.pitch, orientation.yaw);
      } else if (state.viewer.lookAt && !isViewerOrientationActive()) {
        state.viewer.lookAt(orientation.pitch, orientation.yaw, undefined, 500);
      }
    }

    updateInfoPanel(node);
    updateNavigation();
    updateFallbackPreview(node);
  }

  function resolveTargetOrientation(node, link) {
    const targetPitch = link?.targetPitch ?? node.initialPitch ?? 0;
    const targetYaw = link?.targetYaw ?? node.initialYaw ?? 0;
    const pitch = Number.isFinite(targetPitch) ? targetPitch : node.initialPitch || 0;

    if (targetYaw === "sameAzimuth" && state.viewer?.getYaw) {
      return { pitch, yaw: state.viewer.getYaw() };
    }

    return {
      pitch,
      yaw: Number.isFinite(targetYaw) ? targetYaw : node.initialYaw || 0
    };
  }

  function updateInfoPanel(node) {
    const index = getCurrentIndex();

    els.routeProgress.textContent = `${index + 1} / ${tour.nodes.length}`;
    els.nodeZone.textContent = `${node.area} / ${node.zone}`;
    els.nodeTitle.textContent = `${node.id} ${node.title}`;
    els.nodeSubtitle.textContent = node.subtitle;
    els.nodeDescription.textContent = node.description;
    els.nodeStatus.textContent = `ルート ${index + 1} / ${tour.nodes.length}`;

    document.querySelectorAll(".node-item").forEach((item) => {
      const isActive = item.dataset.nodeId === node.id;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-current", isActive ? "true" : "false");
    });

    document.querySelectorAll(".map-step").forEach((step) => {
      const isActive = step.dataset.nodeId === node.id;
      step.classList.toggle("is-active", isActive);
      step.setAttribute("aria-current", isActive ? "step" : "false");
    });
  }

  function updateNavigation() {
    const prevNodeId = getPrevNodeId();
    const nextNodeId = getNextNodeId();
    const prevNode = prevNodeId ? nodesById.get(prevNodeId) : null;
    const nextNode = nextNodeId ? nodesById.get(nextNodeId) : null;

    els.prevBtn.disabled = !prevNode;
    els.nextBtn.disabled = !nextNode;
    els.prevBtn.textContent = prevNode ? `前へ: ${prevNode.title}` : "前へ";
    els.nextBtn.textContent = nextNode ? `次へ: ${nextNode.title}` : "次へ";
  }

  function updateFallbackPreview(node) {
    if (!state.isFallback) {
      return;
    }

    els.panorama.style.backgroundImage = `url("${node.image}")`;
  }

  function getCurrentIndex() {
    return Math.max(0, routeIds.indexOf(state.currentNodeId));
  }

  function getNodeIndex(nodeId) {
    return Math.max(0, routeIds.indexOf(nodeId));
  }

  function getNextNodeId() {
    const nextIndex = getCurrentIndex() + 1;
    return nextIndex < routeIds.length ? routeIds[nextIndex] : null;
  }

  function getPrevNodeId() {
    const prevIndex = getCurrentIndex() - 1;
    return prevIndex >= 0 ? routeIds[prevIndex] : null;
  }

  function goForward() {
    const nextNodeId = getNextNodeId();
    if (!nextNodeId) {
      return;
    }

    const currentNode = nodesById.get(state.currentNodeId);
    const link = currentNode.links.find(
      (candidate) => candidate.direction === "forward" && candidate.target === nextNodeId
    );
    loadNode(nextNodeId, { link });
  }

  function goBack() {
    const prevNodeId = getPrevNodeId();
    if (!prevNodeId) {
      return;
    }

    const currentNode = nodesById.get(state.currentNodeId);
    const link = currentNode.links.find(
      (candidate) => candidate.direction === "back" && candidate.target === prevNodeId
    );
    loadNode(prevNodeId, { link });
  }

  function isTypingTarget(target) {
    if (!target) {
      return false;
    }

    const tagName = target.tagName;
    return (
      target.isContentEditable ||
      tagName === "INPUT" ||
      tagName === "TEXTAREA" ||
      tagName === "SELECT"
    );
  }

  function toggleFullscreen() {
    const target = document.querySelector(".viewer-section");

    if (!document.fullscreenElement) {
      target.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function updateAutoRotateButton() {
    els.autoRotateBtn.setAttribute("aria-pressed", String(state.autoRotate));
    els.autoRotateBtn.classList.toggle("is-active", state.autoRotate);
  }

  function toggleAutoRotate() {
    state.autoRotate = !state.autoRotate;
    updateAutoRotateButton();

    if (!state.viewer) {
      return;
    }

    if (state.autoRotate) {
      if (isViewerOrientationActive()) {
        stopOrientation();
      }
      state.viewer.startAutoRotate(-2);
    } else {
      state.viewer.stopAutoRotate();
    }
  }

  function showError(message) {
    els.errorBox.hidden = false;
    els.errorBox.textContent = message;
  }

  function clearError() {
    els.errorBox.hidden = true;
    els.errorBox.textContent = "";
  }
})();
