# 画像生成プロンプト

## 共通条件

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
The scene is a historically inspired immersive reconstruction of Yuzuki Castle in Iyo during the late Sengoku period.
Make the scene feel like one physical step in a connected route.
Show the previous location behind the viewer and the next location ahead where applicable.
Use shared landmarks across adjacent panoramas.
Keep the horizon centered.
Avoid modern objects, text, labels, signs, cars, electric poles, asphalt, modern clothing, fantasy architecture, oversized early-modern castle towers, western castles, magical effects, and fantasy architecture.
Historical atmosphere should be plausible and restrained, suitable for an educational tourism exhibit.
```

## N01 外堀入口

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: outer moat entrance of Yuzuki Castle in Iyo during the late Sengoku period.
Show an earthen moat, low ramparts, a simple wooden bridge or path, and the main gate visible in the distance.
Include a few samurai or ashigaru in subdued practical clothing, not posed dramatically.
The next location, the main gate, should be visible ahead.
Keep the atmosphere calm, historical, and grounded.
```

## N02 大手門前

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: in front of the main wooden gate of Yuzuki Castle.
Show a modest Sengoku-period wooden gate, gate guards, ashigaru holding spears, and a view back toward the moat behind the viewer.
Avoid large stone walls or huge white castle towers.
The next route toward the rampart path should be visible through or beside the gate.
```

## N03 土塁沿いの通路

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: a walking path along earthen ramparts inside Yuzuki Castle.
Show compact earthworks, wooden fences, a moat visible to one side, and a patrolling samurai or ashigaru.
Make the previous main gate visible behind and the inner courtyard direction visible ahead.
Use repeated landmarks from adjacent scenes for continuity.
```

## N04 城内広場

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: an inner courtyard or working open space inside Yuzuki Castle.
Show a well, horses, bundles of supplies, simple military gear, retainers, household workers, and nearby samurai residences.
The scene should feel active but not theatrical.
Show the rampart path behind and the samurai residential street ahead.
```

## N05 武家屋敷前の通り

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: a street in front of samurai residences inside Yuzuki Castle.
Show residence gates, low walls, garden trees, household members, a samurai, and children at a realistic distance.
The inner courtyard should feel behind the viewer, and the entrance to a residence garden should be ahead.
Keep the scene modest and grounded.
```

## N06 武家屋敷の庭と縁側

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: inside a samurai residence garden and veranda at Yuzuki Castle.
Show a wooden veranda, garden stones, a small well, spear rack, armor stored near a wall, and subtle signs of cooking or daily life.
Avoid luxury palace architecture.
The previous residential street should be behind, and the route toward a guard post should be ahead.
```

## N07 詰所・見張り場

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: a guard post and lookout area within Yuzuki Castle.
Show a simple watch platform, flags, spears, bows, patrolling soldiers, and a partial view down into the castle grounds.
The residence area should be behind the viewer, and a higher overlook path should be ahead.
Keep the military atmosphere tense but realistic.
```

## N08 高台から見た城内の眺望

```text
Create one complete 360-degree equirectangular panorama, exactly 2:1 aspect ratio, from human eye height.
Scene: an overlook from a raised area within Yuzuki Castle.
Show earthen ramparts, moat lines, modest gates, clusters of samurai residences, and the route traveled through the castle.
This is the closing scene, so emphasize spatial understanding and a calm panoramic view.
Do not include oversized castle towers, modern roads, signs, cars, or fantasy elements.
```

## 参照画像を使う日本語プロンプト

`assets/reference/` の画像は本番360パノラマではなく、作風・建築様式・人物配置・色調の参照画像です。生成時は参照画像の雰囲気を利用しつつ、必ず2:1のequirectangular panoramaとして新規生成してください。参照画像そのものを引き伸ばしたり、単純に背景化したりしないでください。

共通指定:

```text
道後公園・湯築城跡を題材にした、戦国期の伊予・湯築城の歴史的イメージ再現。人の目線の高さから見た、完全な360度equirectangular panoramaを1枚生成する。アスペクト比は正確に2:1。地平線は中央付近に保つ。隣接地点とつながる一本道のウォークスルーとして、前の地点が背後に、次の地点が前方に感じられるようにする。土塁、堀、木造門、武家屋敷、侍、足軽、家人の配置は控えめで自然にする。巨大天守、近世城郭風の白亜天守、現代道路、アスファルト、電柱、看板、自動車、現代服、英字や不自然な文字、ファンタジー要素は入れない。厳密復元ではなく、教育・観光展示向けの落ち着いた歴史体験として仕上げる。
```

### N01 外堀入口

参照画像: `assets/reference/01_outer_moat_reference.png`

```text
参照画像 `assets/reference/01_outer_moat_reference.png` の色調、土塁と堀の見え方、人物の密度を参考にする。湯築城の外堀入口として、低い土塁、堀、木橋または土の通路、遠くに見える控えめな木造門を描く。前方にはN02の大手門へ続く進路を置き、背後には城外の気配を残す。侍や足軽は少数で、来訪者を迎える導入地点として静かな緊張感を出す。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N02 大手門前

参照画像: `assets/reference/02_main_gate_reference.png`

```text
参照画像 `assets/reference/02_main_gate_reference.png` の木造門、土壁、人物配置、落ち着いた色調を参考にする。湯築城の大手門前として、巨大ではない戦国期らしい木造門、門番、槍を持つ足軽、外堀方向の見返りを入れる。前方または門の先にN03の土塁沿い通路へ進む道を見せる。石垣や白亜天守を強調しない。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N03 土塁沿いの通路

参照画像: `assets/reference/03_rampart_path_reference.png`

```text
参照画像 `assets/reference/03_rampart_path_reference.png` の土の質感、木柵、道幅、緑と土色のバランスを参考にする。土塁沿いの通路として、片側に土塁と木柵、もう片側に堀または低地の気配を描く。背後にN02の門の方向、前方にN04の城内広場へ開ける道を置く。巡回する侍や足軽を自然に配置する。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N04 城内広場

参照画像: `assets/reference/04_inner_courtyard_reference.png`、補助参照: `assets/reference/09_training_yard_reference.png`

```text
参照画像 `assets/reference/04_inner_courtyard_reference.png` の広場構成と建物の距離感、補助参照 `assets/reference/09_training_yard_reference.png` の人物活動や兵具の置き方を参考にする。城内広場として、井戸、馬、物資運搬、簡素な兵具、家人や侍を自然に配置する。背後にN03の土塁沿い通路、前方にN05の武家屋敷前の通りがつながるようにする。活動感はあるが、祭りや戦闘のように過剰にしない。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N05 武家屋敷前の通り

参照画像: `assets/reference/05_samurai_street_reference.png`、補助参照: `assets/reference/10_twilight_residential_reference.png`

```text
参照画像 `assets/reference/05_samurai_street_reference.png` の屋敷門、低い塀、通りの奥行き、人物の距離感を参考にする。補助参照 `assets/reference/10_twilight_residential_reference.png` は色調や居住空間の落ち着きだけを参考にする。武家屋敷前の通りとして、屋敷門、低い土塀、庭木、侍、家人、子どもを控えめに配置する。背後にN04の城内広場、前方にN06の屋敷の庭へ入る気配をつくる。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N06 武家屋敷の庭と縁側

参照画像: `assets/reference/06_residence_garden_reference.png`、補助参照: `assets/reference/10_twilight_residential_reference.png`

```text
参照画像 `assets/reference/06_residence_garden_reference.png` の縁側、庭石、木造建築の質感を参考にする。補助参照 `assets/reference/10_twilight_residential_reference.png` の生活感と柔らかな色調も取り入れる。武家屋敷の庭と縁側として、縁側、庭石、小さな井戸、槍立て、鎧、炊事の気配を配置する。豪華な御殿ではなく、実用的で落ち着いた武家の生活空間にする。背後にN05の通り、前方にN07の詰所へ向かう道を感じさせる。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N07 詰所・見張り場

参照画像: `assets/reference/07_guard_post_reference.png`、補助参照: `assets/reference/09_training_yard_reference.png`

```text
参照画像 `assets/reference/07_guard_post_reference.png` の見張り台、旗、柵、武具の雰囲気を参考にする。補助参照 `assets/reference/09_training_yard_reference.png` の兵の配置と訓練場の空気感も控えめに使う。詰所・見張り場として、簡素な見張り台、旗、槍、弓、巡回兵、城内を見下ろす視点を描く。背後にN06の屋敷側、前方にN08の高台へ上がる動線を置く。戦闘場面にはせず、警戒と見張りの緊張感を出す。2:1 equirectangular panorama、360度全周、地平線中央。
```

### N08 高台から見た城内の眺望

参照画像: `assets/reference/08_overlook_reference.png`

```text
参照画像 `assets/reference/08_overlook_reference.png` の俯瞰感、土塁と屋敷群の見え方、遠景の色調を参考にする。高台から見た城内の眺望として、土塁、堀、門、武家屋敷群、歩いてきたルートの全体像を穏やかに見渡せる構成にする。背後にはN07の見張り場の気配を残す。締めの地点として、空間理解がしやすく、観光・教育展示に向いた落ち着いた眺望にする。2:1 equirectangular panorama、360度全周、地平線中央。
```
