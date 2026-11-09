export type TabId = "studio" | "api" | "agents";
export type BillingCycle = "monthly" | "yearly";
export type PlanId = "starter" | "creator" | "pro";
export type ProfileId = "prototype" | "production" | "scale";

// Only published values may be rendered or used in an estimate.
export type Publication<T> = { status: "draft"; value: T | null } | { status: "published"; value: T };
export type Money = { amount: number; currency: string };
export type UsageRate = { price: Money; units: number; unitLabel: string };
export type ComparisonRow<K extends string> = { label: string; explanation?: string; values: Record<K, Publication<string>> };
export type ComparisonGroup<K extends string> = { title: string; rows: ComparisonRow<K>[] };
export type StudioPlan = { id: PlanId; name: string; description: string; prices: Record<BillingCycle, Publication<Money>> };
export type ApiService = { id: string; name: string; description: string; availability: "internal testing" | "planned" | "available"; metric: Publication<string>; rate: Publication<UsageRate> };
export type AgentProfile = { id: ProfileId; name: string; description: string; focus: string };
