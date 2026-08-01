# P0-A：统一剧集生命周期数据核心

本版本只做底层稳定，不重画首页、Pipeline 或 Workspace。

## 唯一剧集主对象

普通剧集与特别篇继续保存在同一张 `episodes` 表，以不可变 `id` 作为关联主键。`season_no` 与 `episode_no` 仅用于展示和排序。

## 当前状态

- `current_stage`
- `current_substatus`

五个大阶段：

1. `development`
2. `writing`
3. `production`
4. `post`
5. `publishing`

## 阶段里程碑

- `outline_completed_at`
- `writing_started_at`
- `script_locked_at`
- `shoot_started_at`
- `shoot_completed_at`
- `assets_archived_at`
- `edit_completed_at`
- `published_at`
- `reviewed_at`

当前状态可以回退；里程碑不会因为回退而清空。

## 行动字段

- `owner`
- `reviewer`
- `next_action`
- `blocker`
- `target_date`
- `shoot_date`
- `publish_date`
- `storage_link`
- `updated_by`
- `updated_at`

## 向后兼容

旧页面仍可读写：

- `productionStage`
- `scriptStatus`
- `openIssues`

API 会把旧阶段映射到新的阶段与子状态，避免一次性重写全部页面。

## 下一版

P0-B 才开始建立独立单集 URL 与 Workspace 骨架。首页和 Pipeline 在此之后读取同一个 `EpisodeCore`。
