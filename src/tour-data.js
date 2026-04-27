window.YUZUKI_TOUR_DATA = {
  id: "yuzuki_sengoku_walk",
  title: "戦国の湯築城を歩く",
  subtitle: "道後公園 時空360",
  startNode: "N01",
  disclaimer:
    "本コンテンツは、道後公園・湯築城跡を題材とした歴史的イメージ再現です。厳密な史実復元・考古学的復元を示すものではなく、教育・観光・展示用途を想定した体験型プロトタイプです。",
  nodes: [
    {
      id: "N01",
      title: "外堀入口",
      subtitle: "湯築城へ入る起点",
      image: "assets/panos/N01_outer_moat.webp",
      thumb: "assets/thumbs/N01_outer_moat.webp",
      description:
        "外堀と土塁を望みながら、城内へ向かう導入地点。遠くに木橋と門を置き、来訪者が戦国期の城郭空間へ踏み込む気配をつくります。",
      zone: "outer_castle",
      initialYaw: 0,
      initialPitch: 0,
      links: [
        {
          target: "N02",
          label: "大手門へ進む",
          yaw: 0,
          pitch: -4
        }
      ]
    },
    {
      id: "N02",
      title: "大手門前",
      subtitle: "城内へ入る緊張感",
      image: "assets/panos/N02_main_gate.webp",
      thumb: "assets/thumbs/N02_main_gate.webp",
      description:
        "木造の門、門番、槍を持つ足軽が見える地点。外堀側を振り返れるようにし、城内へ入る前の境界感を演出します。",
      zone: "gate",
      initialYaw: 10,
      initialPitch: 0,
      links: [
        {
          target: "N01",
          label: "外堀入口へ戻る",
          yaw: 180,
          pitch: -5
        },
        {
          target: "N03",
          label: "土塁沿いの通路へ進む",
          yaw: 0,
          pitch: -3
        }
      ]
    },
    {
      id: "N03",
      title: "土塁沿いの通路",
      subtitle: "城郭空間の連続性",
      image: "assets/panos/N03_rampart_path.webp",
      thumb: "assets/thumbs/N03_rampart_path.webp",
      description:
        "土塁、木柵、堀を横に見ながら進む通路。巡回する侍や足軽を添え、湯築城跡の地形に沿った歩行感を出します。",
      zone: "rampart",
      initialYaw: 16,
      initialPitch: -1,
      links: [
        {
          target: "N02",
          label: "大手門前へ戻る",
          yaw: 180,
          pitch: -4
        },
        {
          target: "N04",
          label: "城内広場へ進む",
          yaw: 0,
          pitch: -2
        }
      ]
    },
    {
      id: "N04",
      title: "城内広場",
      subtitle: "生活感と活動感",
      image: "assets/panos/N04_inner_courtyard.webp",
      thumb: "assets/thumbs/N04_inner_courtyard.webp",
      description:
        "井戸、馬、物資運搬、兵具、家人の姿を置いた城内の広場。軍事拠点でありながら人が暮らす場所だったことを感じられる場面です。",
      zone: "inner_court",
      initialYaw: -8,
      initialPitch: 0,
      links: [
        {
          target: "N03",
          label: "土塁沿いの通路へ戻る",
          yaw: 180,
          pitch: -4
        },
        {
          target: "N05",
          label: "武家屋敷前の通りへ進む",
          yaw: 0,
          pitch: -3
        }
      ]
    },
    {
      id: "N05",
      title: "武家屋敷前の通り",
      subtitle: "侍の居住空間",
      image: "assets/panos/N05_samurai_street.webp",
      thumb: "assets/thumbs/N05_samurai_street.webp",
      description:
        "屋敷門、低い塀、庭木、家人や子どもが見える通り。城内の軍事的な緊張から、武家の暮らしへ視点を移します。",
      zone: "residential_street",
      initialYaw: 4,
      initialPitch: 0,
      links: [
        {
          target: "N04",
          label: "城内広場へ戻る",
          yaw: 180,
          pitch: -4
        },
        {
          target: "N06",
          label: "屋敷の庭と縁側へ進む",
          yaw: 0,
          pitch: -3
        }
      ]
    },
    {
      id: "N06",
      title: "武家屋敷の庭と縁側",
      subtitle: "生活空間の内部体験",
      image: "assets/panos/N06_residence_garden.webp",
      thumb: "assets/thumbs/N06_residence_garden.webp",
      description:
        "縁側、庭石、井戸、槍立て、鎧、炊事の気配を置いた屋敷内。展示向けに、武家の生活と備えが同居する空間として見せます。",
      zone: "samurai_residence",
      initialYaw: -12,
      initialPitch: 0,
      links: [
        {
          target: "N05",
          label: "武家屋敷前の通りへ戻る",
          yaw: 180,
          pitch: -4
        },
        {
          target: "N07",
          label: "詰所・見張り場へ進む",
          yaw: 0,
          pitch: -2
        }
      ]
    },
    {
      id: "N07",
      title: "詰所・見張り場",
      subtitle: "軍事的緊張感",
      image: "assets/panos/N07_guard_post.webp",
      thumb: "assets/thumbs/N07_guard_post.webp",
      description:
        "見張り台、旗、槍、弓、巡回兵を置いた詰所。城内を見下ろす視点へ移り、ここが防御と監視のための場所であることを示します。",
      zone: "guard_post",
      initialYaw: 8,
      initialPitch: -1,
      links: [
        {
          target: "N06",
          label: "屋敷の庭と縁側へ戻る",
          yaw: 180,
          pitch: -5
        },
        {
          target: "N08",
          label: "高台の眺望へ進む",
          yaw: 0,
          pitch: -1
        }
      ]
    },
    {
      id: "N08",
      title: "高台から見た城内の眺望",
      subtitle: "歩いてきた道を見渡す締め",
      image: "assets/panos/N08_overlook.webp",
      thumb: "assets/thumbs/N08_overlook.webp",
      description:
        "土塁、堀、門、屋敷群を俯瞰する終点。歩いてきたルートの記憶をつなぎ、湯築城跡の全体像を穏やかに締めくくります。",
      zone: "overlook",
      initialYaw: 0,
      initialPitch: -3,
      links: [
        {
          target: "N07",
          label: "詰所・見張り場へ戻る",
          yaw: 180,
          pitch: -5
        }
      ]
    }
  ]
};
