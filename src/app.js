(function () {
  "use strict";

  const tour = window.YUZUKI_TOUR_DATA;
  const state = {
    currentNodeId: tour ? tour.startNode : null,
    viewer: null,
    isFallback: false,
    autoRotate: false
  };

  const els = {
    tourTitle: document.getElementById("tourTitle"),
    routeProgress: document.getElementById("routeProgress"),
    panorama: document.getElementById("panorama"),
    fallback: document.getElementById("viewerFallback"),
    homeBtn: document.getElementById("homeBtn"),
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
      for (const link of node.links) {
        if (!ids.has(link.target)) {
          errors.push(`${node.id}のリンク先が見つかりません: ${link.target}`);
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

    state.viewer = window.pannellum.viewer("panorama", buildPannellumConfig(tour));
    state.viewer.on("scenechange", (sceneId) => {
      loadNode(sceneId, { fromSceneEvent: true });
    });
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
          sceneId: link.target
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
    els.prevBtn.addEventListener("click", () => goRelative(-1));
    els.nextBtn.addEventListener("click", () => goRelative(1));
    els.homeBtn.addEventListener("click", () => loadNode(tour.startNode));
    els.fullscreenBtn.addEventListener("click", toggleFullscreen);
    els.autoRotateBtn.addEventListener("click", toggleAutoRotate);

    document.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) {
        return;
      }

      if (event.key === "ArrowLeft") {
        goRelative(-1);
      } else if (event.key === "ArrowRight") {
        goRelative(1);
      } else if (event.key === "Home") {
        loadNode(tour.startNode);
      }
    });
  }

  function renderNodeList() {
    els.nodeList.replaceChildren();

    for (const node of tour.nodes) {
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

    for (const node of tour.nodes) {
      const step = document.createElement("button");
      step.type = "button";
      step.className = "map-step";
      step.dataset.nodeId = node.id;
      step.textContent = node.id.replace("N", "");
      step.title = `${node.id} ${node.title}`;
      step.addEventListener("click", () => loadNode(node.id));
      els.miniMap.append(step);
    }
  }

  function loadNode(nodeId, options) {
    const node = nodesById.get(nodeId);
    if (!node) {
      showError(`指定された地点が見つかりません: ${nodeId}`);
      return;
    }

    state.currentNodeId = node.id;
    clearError();

    if (state.viewer && !options?.fromSceneEvent) {
      const activeScene = state.viewer.getScene ? state.viewer.getScene() : null;
      if (activeScene !== node.id) {
        state.viewer.loadScene(node.id, node.initialPitch || 0, node.initialYaw || 0);
      }
    }

    updateInfoPanel(node);
    updateNavigation(node);
    updateFallbackPreview(node);
  }

  function updateInfoPanel(node) {
    const index = getCurrentIndex();

    els.routeProgress.textContent = `${index + 1} / ${tour.nodes.length}`;
    els.nodeZone.textContent = node.zone;
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
    const index = getCurrentIndex();

    els.prevBtn.disabled = index <= 0;
    els.nextBtn.disabled = index >= tour.nodes.length - 1;
    els.prevBtn.textContent = index <= 0 ? "前へ" : `前へ: ${tour.nodes[index - 1].title}`;
    els.nextBtn.textContent =
      index >= tour.nodes.length - 1 ? "次へ" : `次へ: ${tour.nodes[index + 1].title}`;
  }

  function updateFallbackPreview(node) {
    if (!state.isFallback) {
      return;
    }

    els.panorama.style.backgroundImage = `url("${node.image}")`;
  }

  function goRelative(offset) {
    const nextIndex = getCurrentIndex() + offset;
    if (nextIndex < 0 || nextIndex >= routeIds.length) {
      return;
    }

    loadNode(routeIds[nextIndex]);
  }

  function getCurrentIndex() {
    return Math.max(0, routeIds.indexOf(state.currentNodeId));
  }

  function toggleFullscreen() {
    const target = document.querySelector(".viewer-section");

    if (!document.fullscreenElement) {
      target.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  function toggleAutoRotate() {
    state.autoRotate = !state.autoRotate;
    els.autoRotateBtn.setAttribute("aria-pressed", String(state.autoRotate));
    els.autoRotateBtn.classList.toggle("is-active", state.autoRotate);

    if (!state.viewer) {
      return;
    }

    if (state.autoRotate) {
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
