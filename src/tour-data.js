/*
  Hotspot adjustment notes:
  yaw:
    Current scene horizontal direction where the hotspot appears.
  pitch:
    Current scene vertical direction where the hotspot appears.
  targetYaw:
    Destination scene horizontal direction shown after moving.
  targetPitch:
    Destination scene vertical direction shown after moving.

  The current panoramas are prototype assets. After replacing them with final
  equirectangular images, tune yaw / pitch / targetYaw / targetPitch against
  the actual image orientation.
*/
window.YUZUKI_TOUR_DATA = {
  id: "yuzuki_sengoku_walk",
  title: "戦国の湯築城を歩く",
  subtitle: "道後公園 時空360",
  startNode: "N001",
  disclaimer:
    "本コンテンツは、道後公園・湯築城跡を題材とした歴史的イメージ再現です。厳密な史実復元・考古学的復元を示すものではなく、教育・観光・展示用途を想定した体験型プロトタイプです。",
  nodes: [
    {
      id: "N001",
      title: "外堀入口",
      subtitle: "湯築城へ入る起点",
      image: "assets/panos/N01_outer_moat.webp",
      thumb: "assets/thumbs/N01_outer_moat.webp",
      description:
        "外堀と土塁を望みながら城内へ向かう導入地点。遠くの木橋と門へ歩き出す気配をつくります。",
      zone: "外堀",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N002",
          label: "堀端へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N002",
      title: "堀端の小道",
      subtitle: "外堀沿いに進む細い道",
      image: "assets/panos/N002_moat_path.png",
      thumb: "assets/thumbs/N002_moat_path.png",
      description:
        "堀と土塁を横に見ながら、木橋へ向かって歩く地点。城外から城内へ近づく緊張感を見せます。",
      zone: "外堀",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N001",
          label: "外堀入口へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N003",
          label: "木橋へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N003",
      title: "木橋手前",
      subtitle: "城内へ渡る直前",
      image: "assets/panos/N003_before_bridge.png",
      thumb: "assets/thumbs/N003_before_bridge.png",
      description:
        "木橋を目前にした地点。背後に外堀、前方に大手門へ続く進路を置きます。",
      zone: "外堀",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N002",
          label: "堀端へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N004",
          label: "木橋上へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N004",
      title: "木橋上",
      subtitle: "堀を越えて門へ近づく",
      image: "assets/panos/N004_on_bridge.png",
      thumb: "assets/thumbs/N004_on_bridge.png",
      description:
        "堀を渡りながら門前へ近づく地点。左右に水面や土塁の気配を残します。",
      zone: "木橋",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N003",
          label: "木橋手前へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N005",
          label: "大手門へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N005",
      title: "大手門前",
      subtitle: "城内へ入る緊張感",
      image: "assets/panos/N02_main_gate.webp",
      thumb: "assets/thumbs/N02_main_gate.webp",
      description:
        "木造の門を正面に見る地点。門番や足軽の気配で、城内へ入る境界感を演出します。",
      zone: "大手門",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N004",
          label: "木橋へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N006",
          label: "門番の脇へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N006",
      title: "門番の脇",
      subtitle: "大手門を横から見る",
      image: "assets/panos/N006_beside_gate_guard.png",
      thumb: "assets/thumbs/N006_beside_gate_guard.png",
      description:
        "門番の脇を通る地点。大手門の厚みと通過する感覚を強めます。",
      zone: "大手門",
      area: "外堀と木橋",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N005",
          label: "大手門へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N007",
          label: "門内へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N007",
      title: "大手門内側",
      subtitle: "城内側へ入った直後",
      image: "assets/panos/N007_inside_main_gate.png",
      thumb: "assets/thumbs/N007_inside_main_gate.png",
      description:
        "門を抜けて城内側へ入った地点。背後に門、前方に土塁沿いの通路を見せます。",
      zone: "大手門",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N006",
          label: "門番の脇へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N008",
          label: "土塁沿いへ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N008",
      title: "土塁沿い入口",
      subtitle: "城郭空間に入る",
      image: "assets/panos/N008_rampart_entry.png",
      thumb: "assets/thumbs/N008_rampart_entry.png",
      description:
        "土塁と木柵が近づく入口。門から続く防御空間の連続性を見せます。",
      zone: "土塁",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N007",
          label: "門内へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N009",
          label: "土塁前半へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N009",
      title: "土塁沿い前半",
      subtitle: "堀と土塁を横に見る",
      image: "assets/panos/N03_rampart_path.webp",
      thumb: "assets/thumbs/N03_rampart_path.webp",
      description:
        "土塁沿いを進む地点。巡回する兵の気配と、堀を意識できる視点を置きます。",
      zone: "土塁",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N008",
          label: "土塁入口へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N010",
          label: "木柵沿いへ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N010",
      title: "木柵沿い",
      subtitle: "防御線のそばを進む",
      image: "assets/panos/N010_wooden_fence_path.png",
      thumb: "assets/thumbs/N010_wooden_fence_path.png",
      description:
        "木柵を横に見ながら進む地点。城郭の守りと歩行ルートを同時に感じられる場面です。",
      zone: "土塁",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N009",
          label: "土塁前半へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N011",
          label: "堀の見下ろしへ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N011",
      title: "堀を見下ろす地点",
      subtitle: "土塁の高さを感じる",
      image: "assets/panos/N011_overlook_moat.png",
      thumb: "assets/thumbs/N011_overlook_moat.png",
      description:
        "堀を見下ろし、土塁の高さを感じる地点。背後に木柵、前方に広場方面をつなぎます。",
      zone: "土塁",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: -1,
      links: [
        {
          target: "N010",
          label: "木柵沿いへ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N012",
          label: "広場手前へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N012",
      title: "城内広場手前",
      subtitle: "通路が開ける地点",
      image: "assets/panos/N012_before_courtyard.png",
      thumb: "assets/thumbs/N012_before_courtyard.png",
      description:
        "土塁沿いから城内広場へ出る手前。狭い通路から生活空間へ視界が開けます。",
      zone: "城内",
      area: "大手門と土塁",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N011",
          label: "堀の見下ろしへ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N013",
          label: "広場へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N013",
      title: "城内広場",
      subtitle: "生活感と活動感",
      image: "assets/panos/N04_inner_courtyard.webp",
      thumb: "assets/thumbs/N04_inner_courtyard.webp",
      description:
        "城内の活動が集まる広場。井戸、物資、馬留めへ分かれていく動線の中心になります。",
      zone: "広場",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N012",
          label: "広場手前へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N014",
          label: "井戸へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N014",
      title: "井戸前",
      subtitle: "暮らしを支える水場",
      image: "assets/panos/N014_well_front.png",
      thumb: "assets/thumbs/N014_well_front.png",
      description:
        "井戸の前に立つ地点。軍事拠点でありながら人が暮らす城内の生活感を見せます。",
      zone: "広場",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N013",
          label: "広場へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N015",
          label: "物資置場へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N015",
      title: "物資置場",
      subtitle: "城内活動の支度場",
      image: "assets/panos/N015_supply_yard.png",
      thumb: "assets/thumbs/N015_supply_yard.png",
      description:
        "俵や木箱、兵具の気配を置く地点。広場から厩や屋敷通りへつながる支度場です。",
      zone: "広場",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N014",
          label: "井戸へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N016",
          label: "厩へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N016",
      title: "厩・馬留め",
      subtitle: "移動と警備を支える場",
      image: "assets/panos/N016_stable_horse_tether.png",
      thumb: "assets/thumbs/N016_stable_horse_tether.png",
      description:
        "馬留めと簡素な厩を感じる地点。ここから武家屋敷通りへ歩みを移します。",
      zone: "広場",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N015",
          label: "物資置場へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N017",
          label: "武家屋敷へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N017",
      title: "武家屋敷通り入口",
      subtitle: "居住空間へ入る",
      image: "assets/panos/N05_samurai_street.webp",
      thumb: "assets/thumbs/N05_samurai_street.webp",
      description:
        "城内の広場から武家屋敷通りへ入る地点。低い塀や屋敷門が並ぶ落ち着いた空間です。",
      zone: "武家屋敷",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N016",
          label: "厩へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N018",
          label: "屋敷門へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N018",
      title: "屋敷門前",
      subtitle: "武家の暮らしの入口",
      image: "assets/panos/N018_residence_gate.png",
      thumb: "assets/thumbs/N018_residence_gate.png",
      description:
        "屋敷門を前にした地点。通りの奥行きと、屋敷内の庭へ入る気配をつくります。",
      zone: "武家屋敷",
      area: "城内生活",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N017",
          label: "武家屋敷通りへ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N019",
          label: "庭へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N019",
      title: "屋敷の庭",
      subtitle: "屋敷内の落ち着いた空間",
      image: "assets/panos/N06_residence_garden.webp",
      thumb: "assets/thumbs/N06_residence_garden.webp",
      description:
        "庭石や植栽、生活道具を置いた屋敷内の庭。武家の暮らしと備えが同居する場面です。",
      zone: "屋敷内",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N018",
          label: "屋敷門へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N020",
          label: "縁側へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N020",
      title: "縁側",
      subtitle: "生活と庭をつなぐ場所",
      image: "assets/panos/N020_veranda.png",
      thumb: "assets/thumbs/N020_veranda.png",
      description:
        "縁側から庭を見る地点。屋敷の静けさから、詰所へ向かう軍事的な空気へ移っていきます。",
      zone: "屋敷内",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N019",
          label: "庭へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N021",
          label: "詰所へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N021",
      title: "詰所前",
      subtitle: "警備の気配が強まる",
      image: "assets/panos/N07_guard_post.webp",
      thumb: "assets/thumbs/N07_guard_post.webp",
      description:
        "詰所の前に立つ地点。槍や弓、見張りの気配で城内警備の役割を示します。",
      zone: "詰所",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N020",
          label: "縁側へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N022",
          label: "見張り台へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N022",
      title: "見張り台",
      subtitle: "城内を見渡す警戒地点",
      image: "assets/panos/N022_watchtower.png",
      thumb: "assets/thumbs/N022_watchtower.png",
      description:
        "見張り台の近くから城内を見渡す地点。旗や柵、武具で防御の空気を残します。",
      zone: "詰所",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: -1,
      links: [
        {
          target: "N021",
          label: "詰所へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N023",
          label: "高台へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N023",
      title: "高台への坂",
      subtitle: "終点へ上がる道",
      image: "assets/panos/N023_slope_to_overlook.png",
      thumb: "assets/thumbs/N023_slope_to_overlook.png",
      description:
        "見張り台から高台へ上がる坂道。歩いてきた城内の眺望へ視点を移します。",
      zone: "高台",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: -1,
      links: [
        {
          target: "N022",
          label: "見張り台へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        },
        {
          target: "N024",
          label: "眺望へ",
          direction: "forward",
          yaw: 0,
          pitch: -8,
          targetYaw: 0,
          targetPitch: 0,
          icon: "arrow-forward"
        }
      ]
    },
    {
      id: "N024",
      title: "城内眺望",
      subtitle: "歩いてきた道を見渡す締め",
      image: "assets/panos/N08_overlook.webp",
      thumb: "assets/thumbs/N08_overlook.webp",
      description:
        "土塁、堀、門、屋敷群を穏やかに見渡す終点。24地点のルートを振り返る眺望です。",
      zone: "高台",
      area: "屋敷と眺望",
      initialYaw: 0,
      initialPitch: -2,
      links: [
        {
          target: "N023",
          label: "高台への坂へ戻る",
          direction: "back",
          yaw: 180,
          pitch: -8,
          targetYaw: 180,
          targetPitch: 0,
          icon: "arrow-back"
        }
      ]
    }
  ]
};
