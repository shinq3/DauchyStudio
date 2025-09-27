import VisionBlock from '../VisionBlock';

export default function VisionBlockExample() {
  const bullets = [
    "素早い検証とプロトタイピングにより、アイデアを迅速に実現します",
    "ユーザーとの共創を通じて、真に価値のあるソリューションを開発します",
    "現実的な課題に対するDXソリューションで、実用性を重視します",
    "継続的な改善とイノベーションで、常に最先端の技術を提供します"
  ];

  return (
    <VisionBlock
      heading="なぜAIプロトタイピングなのか"
      bullets={bullets}
    />
  );
}