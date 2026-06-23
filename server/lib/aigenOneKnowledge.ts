import type { Locale } from '@shared/i18n';

type KnowledgeChunk = {
  title: string;
  content: string;
};

const ja: KnowledgeChunk[] = [
  {
    title: 'AiGen-One 概要',
    content: `AiGen-Oneは、AIツールを社員に配って使い方を研修するサービスではありません。会社が業務に合わせたAI機能と業務システムを作り、配り、運用するためのAI業務ポータルです。中心メッセージは「AIツールを配る時代から、AI業務を配る時代へ」。サブメッセージは「話すだけで業務システムを作る」です。議事録、提案資料作成、社内資料検索、多言語チャット、ファイルRAG、業務データ問い合わせ、操作案内、アプリ生成支援などを、社員がAIツール名やモデル名を意識せず使える業務メニューとして提供します。`,
  },
  {
    title: 'AiGen-One が解決する課題',
    content: `企業ではChatGPT、Gemini、NotebookLM、Claude、CopilotなどのAIツールが増えていますが、現場ではツールの使い分け、プロンプトの属人化、AI出力の転記、社内データや権限との分断、新機能の学び直しが残っています。AiGen-OneはAIを「便利な個人ツール」ではなく「会社が管理できる業務機能」として扱い、権限、ログ、更新、公開範囲、利用上限を管理できる形にします。`,
  },
  {
    title: 'AiGen-One の利用イメージ',
    content: `利用者は要件定義書や設計書を書かず、普段の言葉で業務の困りごとを話します。AiGen-Oneは誰が使うのか、必要な項目、承認、通知、参照ファイル、AI支援の必要性を対話で確認し、一覧、入力フォーム、詳細画面、検索、要約、資料生成、AI回答支援などを業務に合わせて生成します。生成された機能はAiGen-Oneの業務メニューに配置され、社員はAIツールを使うのではなく、業務としてAIを使います。`,
  },
  {
    title: 'Plugin Marketplace とプリセットAI機能',
    content: `AiGen-Oneはすべてをゼロから作る前提ではありません。よく使うAI業務はプラグインとして追加できます。例は議事録プラグイン、商談メモから提案資料作成、ファイル共有RAG、多言語同時通訳チャット、将来的なSkills・エージェントです。基幹DBと未接続でも、議事録、提案資料作成、ファイル検索、多言語チャットのような機能は即導入しやすく、既存システム改修を待たずにAI業務の入口を作れます。`,
  },
  {
    title: 'AiGen-One の構成',
    content: `AiGen-Oneは、ポータルUI、業務アプリ生成、AI実行、データ基盤、管理レイヤーで構成されます。ポータルUIは業務メニュー、チャット、生成された業務画面を集約します。業務アプリ生成は要件ヒアリング、画面設計、データ設計、ワークフロー設計を支援します。AI実行はLLM、RAG、要約、翻訳、資料生成、エージェント実行を機能単位で制御します。データ基盤はアップロードファイル、共有資料、業務データ、ベクトル検索、参照元を管理します。管理レイヤーはユーザー、権限、プラグイン、利用ログ、バージョンを管理します。`,
  },
  {
    title: 'AiGen-One の部署別ユースケース',
    content: `営業では商談メモから提案書作成、過去提案資料の検索、営業日報の要約に使えます。管理部門では社内規程検索、稟議文の下書き、契約書チェック補助に使えます。カスタマーサポートでは問い合わせ履歴検索、回答案作成、FAQ更新案作成に使えます。海外・多言語チームでは多言語チャット、海外拠点との会議要約、資料翻訳共有に使えます。情報システムでは社内データ問い合わせ、権限管理、利用ログ確認に使えます。`,
  },
  {
    title: 'AiGen-One のガバナンスとセキュリティ',
    content: `AiGen-Oneは、会社としてAI活用を管理するために、権限管理、利用ログ、RAG参照範囲、バージョン管理を重視します。誰がどの情報を見て、何を生成し、どの機能を使ったかを追えることが重要です。部署、役職、業務単位で公開範囲を設定し、RAGで参照できるファイルや根拠表示も業務機能ごとに設定します。プロンプト、モデル、プラグイン、業務アプリの更新を管理し、現場任せのAI利用から会社管理のAI業務へ移行します。`,
  },
  {
    title: 'AiGen-One の料金プラン',
    content: `AiGen-Oneは必要な機能だけを選べる料金体系です。業務ユーザーは月額800円/人で、業務メニュー利用、本番公開済みアプリの利用、入力・検索・編集・確認が対象です。AIユーザーは月額2,800円/人で、業務ユーザー機能に加え、AiGen-One Chat、一般LLMチャット、社内ナレッジ検索、業務データ問い合わせ、操作案内、MCP Accessを含みます。Workspaceユーザーは月額5,800円/人で、AIユーザー機能に加え、アプリ生成、既存アプリを元にした改修、プレビュー確認、チャットによるリファイン、共有申請を含みます。組織管理者は月額6,800円/人で、AIユーザー機能、アプリ生成、スタッフ管理、権限管理、利用上限管理、共有承認、業務メニュー管理を含みます。システム管理者は基本料込み/追加課金で、組織管理、DB接続、外部連携、Git/API/MCP/OAuth管理、本番反映、プラグイン管理、セキュリティ、監査ログを扱います。基本料金は初期導入費50万〜150万円、プラットフォーム基本料15万円/月、プラグイン利用料3万〜15万円/月/本、業界特化プラグインセット20万〜50万円/月です。`,
  },
  {
    title: 'AiGen-One Chat と MCP Access',
    content: `AiGen-One Chatは、一般的なLLMチャットとして文章作成、要約、相談に使えるだけでなく、社内ナレッジ検索、業務データ問い合わせ、操作案内、アプリ生成支援まで行える業務専用AIです。MCP Accessにより、ClaudeやCodexなど現在利用中のMCP対応LLMチャットからも、AiGen-Oneの社内ナレッジ、業務データ、アプリ生成機能を安全に利用できます。メッセージは「使い慣れたAIはそのまま。業務データと社内ナレッジはAiGen-Oneで安全に接続。」です。`,
  },
  {
    title: 'AiGen-One 導入ロードマップ',
    content: `導入は小さく始めて拡張できます。フェーズ1では議事録、提案資料作成、ファイル共有RAG、多言語チャットなどのプリセットAI機能から導入します。フェーズ2では現場の言葉から業務アプリを生成し、部署単位で共有します。フェーズ3では社内データベース、外部SaaS、既存システムと連携します。フェーズ4ではエージェント、Skills、業界特化プラグインを追加し、AI業務のマーケットプレイスを拡張します。`,
  },
];

const en: KnowledgeChunk[] = [
  {
    title: 'AiGen-One overview',
    content: `AiGen-One is an AI operations portal for companies to create, distribute, and operate AI-powered business functions. It is not a service for teaching employees how to use AI tools. Its message is: from distributing AI tools to distributing AI work. It turns spoken business needs into systems and packages AI workflows such as meeting minutes, proposal generation, internal document search, multilingual chat, file RAG, business data Q&A, operation guidance, and app generation support into managed company workflows.`,
  },
  {
    title: 'AiGen-One pricing and plans',
    content: `AiGen-One pricing is modular. Business User is 800 JPY per person per month for using published business apps. AI User is 2,800 JPY per person per month and includes AiGen-One Chat, general LLM chat, internal knowledge search, business data Q&A, operation guidance, and MCP Access. Workspace User is 5,800 JPY per person per month and adds app generation, app improvement, preview, chat refinement, and sharing requests. Organization Admin is 6,800 JPY per person per month and adds staff management, permissions, usage limits, sharing approval, and business menu management. System Admin is included in the base fee or charged additionally for organization management, DB connection, external integrations, Git/API/MCP/OAuth, production release, plugins, security, and audit logs. Base fees include initial setup of 500,000 to 1,500,000 JPY, platform fee of 150,000 JPY/month, plugin fees of 30,000 to 150,000 JPY/month/plugin, and industry plugin sets of 200,000 to 500,000 JPY/month.`,
  },
  {
    title: 'AiGen-One governance and MCP Access',
    content: `AiGen-One manages AI as company operations, with permissions, usage logs, RAG reference scopes, versions, plugins, prompts, and model updates. MCP Access allows tools such as Claude and Codex to safely use AiGen-One internal knowledge, business data, and app generation functions while keeping governance inside AiGen-One.`,
  },
];

const vi: KnowledgeChunk[] = [
  {
    title: 'Tổng quan AiGen-One',
    content: `AiGen-One là cổng vận hành AI giúp doanh nghiệp tạo, phân phối và vận hành các chức năng nghiệp vụ có AI. Đây không phải dịch vụ dạy nhân viên cách dùng công cụ AI. Thông điệp chính là chuyển từ phân phối công cụ AI sang phân phối nghiệp vụ AI. Nền tảng hỗ trợ biên bản họp, tạo đề xuất, tìm kiếm tài liệu nội bộ, chat đa ngôn ngữ, RAG tệp, hỏi đáp dữ liệu nghiệp vụ, hướng dẫn thao tác và hỗ trợ tạo ứng dụng.`,
  },
  {
    title: 'Giá và quản trị AiGen-One',
    content: `AiGen-One có các gói theo vai trò: Business User 800 JPY/người/tháng, AI User 2.800 JPY/người/tháng, Workspace User 5.800 JPY/người/tháng, Organization Admin 6.800 JPY/người/tháng. Phí cơ bản gồm triển khai ban đầu 500.000 đến 1.500.000 JPY, phí nền tảng 150.000 JPY/tháng, plugin 30.000 đến 150.000 JPY/tháng/plugin và bộ plugin ngành 200.000 đến 500.000 JPY/tháng. Nền tảng quản lý quyền, nhật ký, phạm vi RAG, phiên bản, plugin, bảo mật và audit log.`,
  },
];

export function getAigenOneKnowledge(locale: Locale | string): KnowledgeChunk[] {
  if (locale === 'en') return en;
  if (locale === 'vi') return vi;
  return ja;
}
