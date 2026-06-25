# SPEC.md
## 1. 系统概述和功能点清单
本系统主要服务于集团MC工单齐套管理，核心系统为DOP（Digital Operation Platform），部分涉及OMS（Order Management System）。系统通过集成EBS（ERP Business Suite）、SRM（Supplier Relationship Management）等外部系统数据，实现对工单物料齐套情况的实时监控、计算与配置管理。
### 功能点清单
| 序号 | 系统 | 类型 | 功能点 | 开发负责人 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- |
| 1 | DOP | 底表 | 工单齐套_工单详情 | 万文豪 | |
| 2 | DOP | 底表 | 工单齐套明细表 | 万文豪 | |
| 3 | DOP | 底表 | 工单齐套_物料详情 | 万文豪 | |
| 4 | DOP | 底表 | 工单齐套优先级配置表 | 万文豪 | |
| 5 | DOP | 底表 | 计算子库存净值名称 下级配置表 | 万文豪 | |
| 6 | DOP | 底表 | 配置表_齐套规则计算配置表 | 万文豪 | |
| 7 | DOP | 底表 | 配置表_组件责任方 | 万文豪 | |
| 8 | DOP | 底表 | 齐套明细运行历史记录表 | 万文豪 | |
| 9 | OMS | 改造 | OMS，工单变更时"起始MRP日期"变为可变更字段 | 陆勇君 | |
| 10 | OMS | 改造 | OMS订单页面，"要求完成日期"改必填 | 陆勇君 | |
| 11 | DOP | 接口 | DOP->EBS PO信息查询接口 | 万文豪,严居兆 | |
| 12 | DOP | 接口 | DOP->EBS PR信息查询接口 | 万文豪,严居兆 | |
| 13 | DOP | 接口 | DOP->EBS 供应商信息查询接口 | 万文豪,严居兆 | |
| 14 | DOP | 接口 | DOP->EBS 计算子库存净值仓位信息查询接口 | 万文豪,严居兆 | |
| 15 | DOP | 接口 | DOP->EBS 库存查询接口 | 万文豪,严居兆 | |
| 16 | DOP | 接口 | DOP->EBS 物料主数据查询接口 | 万文豪,严居兆 | |
| 17 | DOP | 接口 | DOP->EBS 组织查询接口 | 万文豪,严居兆 | |
| 18 | DOP | 接口 | DOP->OMS 订单 头 信息查询接口 | 万文豪 | |
| 19 | DOP | 接口 | DOP->OMS 订单 行 信息查询接口 | 万文豪 | |
| 20 | DOP | 接口 | DOP->OMS 工单 头 查询接口 | 万文豪 | |
| 21 | DOP | 接口 | DOP->OMS 工单 行 查询接口 | 万文豪 | |
| 22 | DOP | 接口 | DOP->SRM 订单交期报表 | 万文豪,邱海 | |
| 23 | DOP | 前端页面 | 工单齐套_工单详情 | 万文豪 | |
| 24 | DOP | 前端页面 | 工单齐套_工单详细_工单组件信息 | 万文豪 | |
| 25 | DOP | 前端页面 | 工单齐套明细 | 万文豪 | |
| 26 | DOP | 前端页面 | 工单齐套_物料详情_物料关联工单信息 | 万文豪 | |
| 27 | DOP | 前端页面 | 工单齐套_物料详细 | 万文豪 | |
| 28 | DOP | 前端页面 | 工单齐套优先级维护表 | 万文豪 | |
| 29 | DOP | 前端页面 | 齐套规则计算配置表 | 万文豪 | |
| 30 | DOP | 前端页面 | 齐套规则计算配置表_分类码配置屏幕 | 万文豪 | |
| 31 | DOP | 前端页面 | 齐套规则计算配置表_工单状态配置屏幕 | 万文豪 | |
| 32 | DOP | 前端页面 | 齐套规则计算配置表_供给仓位配置 | 万文豪 | |
| 33 | DOP | 前端页面 | 齐套规则计算配置表_供给仓位配置_仓位选择 | 万文豪 | |
| 34 | DOP | 前端页面 | 齐套规则计算配置表_供应商配置屏幕 | 万文豪 | |
| 35 | DOP | 前端页面 | 齐套规则计算配置表_组织配置屏幕 | 万文豪 | |
| 36 | DOP | 前端页面 | 替代料明细 | 万文豪 | 暂定 |
| 37 | DOP | 前端页面 | 组件责任方配置 | 万文豪 | 暂定 |
| 38 | DOP | 前端页面 | PR信息表 | 万文豪 | 暂定 |
| 39 | DOP | 前端页面 | SRM采购订单交期报表 | 万文豪 | 暂定 |
| 40 | DOP | 前端页面 | WO工单信息表 | 万文豪 | 暂定 |
## 2. 字段列表
下表列出了系统中使用的所有关键字段及其基本属性。
| 编号 | 中文名称 | 字段名(开发自定义) | 数据类型 | 基础查询 | 高级查询 | 查询方式 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 报废数量 | scrapQty | VARCHAR | _ | Y | NUM | |
| 2 | 必需 | isRequired | VARCHAR | _ | Y | NUM | 数量 |
| 3 | 仓位名称 | locationCode | VARCHAR | Y | Y | SEL_2 | |
| 4 | 仓位说明 | locationName | VARCHAR | _ | _ | _ | |
| 5 | 操作 | operations | _ | _ | _ | _ | 前端渲染用，无实际字段 |
| 6 | 产出率 | yieldRate | VARCHAR | _ | Y | NUM | 如0.98表示98% |
| 7 | 组织 | orgName | VARCHAR | Y | Y | SEL_2 | 组织名称，另有组织ID |
| 9 | 组织ID | orgId | VARCHAR | _ | Y | SEL_2 | 可用Long，视系统而定 |
| 10 | 产品线 | productLine | VARCHAR | _ | Y | SEL_2 | |
| 11 | 订单编号 | orderNo | VARCHAR | Y | Y | TXT_1 | |
| 12 | 创建日期 | createDate | Date | _ | Y | DATA | |
| 13 | 单位用量 | unitUsage | VARCHAR | _ | Y | NUM | |
| 14 | 工单号 | workOrderNo | VARCHAR | Y | Y | TXT_1 | |
| 15 | 料号 | materialCode | VARCHAR | Y | Y | TXT_1 | 物料编码 |
| 16 | 配置编码 | configCode | VARCHAR | Y | Y | TXT_1 | 所有涉及到该字段的屏幕，在查询和运行时，必填 |
| 17 | 订单创建日期 | orderCreateDate | Date | _ | Y | DATA | |
| 18 | 订单类型 | orderType | VARCHAR | Y | Y | SEL_2 | |
| 19 | 发料仓 | issueWarehouse | VARCHAR | _ | Y | SEL_2 | 仓库编码和名称 |
| 20 | 分类码 | categoryCode | VARCHAR | _ | Y | SEL_2 | |
| 21 | 工单分类 | workOrderCategory | VARCHAR | _ | Y | SEL_2 | |
| 22 | 组件物料 | componentMaterialCode | VARCHAR | Y | Y | TXT_1 | 组件物料编码 |
| 23 | 工单缺料数量 | woShortageQty | VARCHAR | _ | Y | NUM | |
| 24 | 工单优先级 | workOrderPriority | INT | Y | Y | NUM | HIGH/MEDIUM/LOW |
| 25 | 工单状态 | workOrderStatus | VARCHAR | _ | Y | SEL_2 | 进行中、完工、完工不计费 |
| 26 | 供给明细 | supplyDetails | _ | _ | _ | _ | 前端渲染用，无实际字段 |
| 27 | 供应商编码 | supplierCode | VARCHAR | _ | Y | SEL_2 | |
| 28 | 供应商简称 | supplierDesc | VARCHAR | _ | _ | _ | |
| 29 | EBS供给仓位配置 | calcSubInvNetValueName | VARCHAR | _ | Y | SEL_2 | |
| 30 | EBS供给仓位配置说明 | calcSubInvNetValueDesc | VARCHAR | _ | _ | _ | |
| 31 | 可用库存缺料数 | availableStockShortageQty | VARCHAR | _ | Y | NUM | |
| 32 | 可用量 | availableQty | VARCHAR | _ | Y | NUM | |
| 33 | 理论可用库存 | theoreticalAvailableStock | VARCHAR | _ | Y | NUM | |
| 34 | 理论可用库存(含PO&工单) | theoreticalAvailableStockInclPoWo | VARCHAR | _ | Y | NUM | |
| 35 | 创建人 | createdBy | VARCHAR | _ | Y | TXT_2 | |
| 36 | 零部件类别 | componentCategory | VARCHAR | _ | Y | SEL_2 | |
| 37 | 订单创建人 | orderCreator | VARCHAR | _ | Y | TXT_2 | |
| 38 | 配置库存数量 | configInventoryQty | VARCHAR | _ | Y | NUM | |
| 39 | 编辑人 | updatedBy | VARCHAR | _ | Y | TXT_2 | |
| 40 | 齐套进度 | kitProgress | VARCHAR | _ | _ | NUM | 比例0~1或百分数字符串 |
| 40 | 转单人 | transferBy | VARCHAR | _ | Y | TXT_2 | |
| 41 | 剩余齐套数 | remainingKitQty | VARCHAR | _ | Y | NUM | |
| 42 | 实际齐料日期 | actualMaterialReadyDate | Date | Y | Y | DATA | |
| 43 | 是否存在替代料 | hasAlternativeMaterial | Boolean | _ | Y | BOOL | 是/否/空 |
| 44 | 是否齐套 | isKitComplete | Boolean | Y | Y | BOOL | 齐套/不齐套 |
| 45 | 是否启用 | isEnabled | Boolean | Y | Y | BOOL | |
| 46 | 是否有效 | isActive | Boolean | Y | Y | BOOL | true_有效，false_无效 |
| 47 | 组件责任方 | componentResponsibleParty | VARCHAR | Y | Y | TXT_2 | |
| 48 | 替代料及库存 | alternativeMaterialStock | _ | _ | _ | _ | 前端渲染用，无实际字段，超链接 |
| 49 | 未发料数量 | unIssuedQty | VARCHAR | _ | Y | NUM | |
| 50 | 未齐套数 | unKitQty | VARCHAR | _ | Y | NUM | |
| 51 | 未完成数量 | incompleteQty | VARCHAR | _ | Y | NUM | |
| 52 | 下单数量 | orderQty | VARCHAR | _ | Y | NUM | |
| 53 | 现存数量 | onHandQty | VARCHAR | _ | Y | NUM | |
| 54 | 最后运行人 | lastRunBy | VARCHAR | _ | Y | TXT_2 | |
| 55 | 编辑日期 | updateDate | Date | _ | Y | DATA | |
| 56 | 序号 | seqNo | VARCHAR | _ | _ | _ | |
| 57 | 要求齐料日期（起始(MRP)日期） | requiredMaterialDate | Date | _ | Y | DATA | 或 mrpStartDate |
| 58 | 要求完成日期 | requiredCompletionDate | Date | Y | Y | DATA | |
| 59 | 已承诺物料齐套数 | committedKitQty | VARCHAR | _ | Y | NUM | |
| 60 | 已承诺物料最小齐套数 | committedMinKitQty | VARCHAR | _ | Y | NUM | |
| 61 | 工单当前齐套数 | committedSumQty | VARCHAR | _ | Y | NUM | |
| 62 | 已发料量 | issuedQty | VARCHAR | _ | Y | NUM | |
| 63 | 已发料齐套数 | issuedKitQty | VARCHAR | _ | Y | NUM | |
| 64 | 已发料数量齐套数 | issuedQtyKitQty | VARCHAR | _ | Y | NUM | 为避免重复可替换为 issuedKitQty |
| 65 | 已完工数量 | completedQty | VARCHAR | _ | Y | NUM | |
| 66 | 预计齐料日期 | estimatedMaterialReadyDate | Date | _ | Y | DATA | |
| 67 | 运行时间 | runTime | Date | _ | Y | DATA | DateTime |
| 68 | 叠die数 | dieStackQty | VARCHAR | _ | Y | TXT_2 | |
| 69 | 转单时间 | transferTime | Date | _ | Y | DATA | DateTime |
| 70 | 转单数量 | transferQty | VARCHAR | _ | Y | NUM | |
| 71 | LT | componentLeadTime | VARCHAR | _ | Y | NUM | 单位：天 |
| 72 | 组件分类 | componentType | VARCHAR | _ | Y | SEL_2 | |
| 73 | 配置描述 | configDesc | VARCHAR | _ | Y | TXT_2 | |
| 74 | 产品PN | productPn | VARCHAR | _ | Y | TXT_2 | |
| 75 | 产品类别 | productCategory | VARCHAR | _ | Y | SEL_2 | |
| 76 | 容量 | capacity | VARCHAR | _ | Y | SEL_2 | 可含单位，如"256GB" |
| 77 | 说明 | materialDes | VARCHAR | _ | Y | TXT_2 | 物料描述 |
| 78 | 组件物料描述 | componentMaterialDesc | VARCHAR | _ | Y | TXT_2 | |
| 79 | 是否资源 | isResource | Boolean | _ | Y | SEL_1 | Y/N |
| 80 | 已承诺数量 | CommittedQty | VARCHAR | _ | Y | NUM | |
| 81 | 齐套版本 | VerSion | INT | _ | Y | NUM | 配置编码获取&运行时间 |
| 82 | 组件类别 | componentType | VARCHAR | Y | _ | SEL_1 | 人工维护 |
## 3. 查询规则说明
| 搜索编号 | 搜索方式 | 控件类型 | 通配符查询 | 多值分隔方式 | 搜索历史记录 | 是否支持高级查询 | 高级查询可用运算符 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TXT_1 | TXT_MULTI | 输入框（多条件输入） | - | 英文逗号 | 是（按整串存储） | 是 | 等于、不等于、包含、不包含（用于 IN / NOT IN） | |
| TXT_2 | TXT_SINGLE | 输入框 | * | - | 是 | 是 | 等于、不等于、包含、不包含、开头是、结尾是、为空、不为空 | |
| SEL_1 | SEL_SINGLE | 下拉单选 | - | - | 否 | 是 | 等于、不等于、为空、不为空 | |
| SEL_2 | SEL_MULTI | 下拉多选（含全选，反选） | - | 多选值以数组传递 | 否 | 是 | 等于、不等于、为空、不为空 | |
| NUM | NUM-RANGE | 最小值、最大值输入框 | - | - | 否 | 是 | 等于、不等于、大于、小于、大于等于、小于等于、区间、为空、不为空 | 运算符选择区间时，弹出一个输入最小值的输入框 |
| DATA | DATE-SINGLE | 日期选择器 | - | - | 否 | 是 | 等于、不等于、早于、大于、小于、大于等于、小于等于、不为空 | 运算符选择区间时，弹出一个输入最小值的输入框 |
| BOOL | BOOL | 下拉（全部/是/否） | - | - | 否 | 是 | 等于、不等于 | |
## 4. 屏幕详细说明

### 屏幕 1: C1 - 齐套规则计算配置表

*   **屏幕编号**: C1
*   **类型**: 表格
*   **屏幕名称**: 齐套规则计算配置表
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、保存、删除、行删除、行编辑、新增行、勾选框、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 主配置界面。点击"组织"进入C1_1弹窗；点击"分类码"进入C1_2弹窗；点击"EBS供给仓位配置"进入C1_3弹窗；点击"供应商编码"进入C1_4弹窗；点击"工单状态"进入C1_5弹窗。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 配置编码 | configCode | 自动给号，YY+MM+00001(五位流水)，按照如下配置项的数据，通过组成配置信息，过滤工单数据，进行齐套运算 | VARCHAR | Y | Y | TXT_1 | - | |
| 2 | 配置描述 | configDesc | 自定义输入 | VARCHAR | _ | Y | TXT_2 | Y | |
| 3 | 组织 | orgName | 该字段需要优先配置并保存，未配置该字段情况下，不允许配置其它配置参数<br>按屏幕"C1_1"，勾选的组织显示数据，若多组织，按照英文逗号分隔 | VARCHAR | Y | Y | SEL_2 | Y | |
| 4 | 分类码 | categoryCode | 配置值，按屏幕"C1_2"，勾选的"分类码"呈现<br>创建时，按照配置"组织"，到EBS取相应"组织"的"分类码"<br>编辑时，按照已保存的数据进行编辑新增 | VARCHAR | _ | Y | SEL_2 | Y | |
| 5 | EBS供给仓位配置 | calcSubInvNetValueName | 配置值，按屏幕"C1_3"，选择的屏幕呈现字段，该字段可点击"配置"<br>创建时，根据"组织"，到EBS取表"MRP_SCHEDULE_DESIGNATORS"，字段"SCHEDULE_DESIGNATOR"相应"组织"所有数据。<br>编辑时，按照已保存的数据进行编辑新增 | VARCHAR | _ | Y | SEL_2 | Y | |
| 6 | EBS供给仓位配置说明 | calcSubInvNetValueDesc | 配置值，按屏幕"C1_3"，选择的屏幕呈现字段<br>取EBS表"MRP_SCHEDULE_DESIGNATORS"，字段"DESCRIPTION_MIR" | VARCHAR | _ | _ | _ | - | |
| 7 | 供应商编码 | supplierCode | 取屏幕"C1_4"数据，可点击"配置"<br>当创建时，按照"组织"到，EBS取表"AP_SUPPLIERS"，字段"VENDOR_TYPE_LOOKUP_CODE"=委外供应商的，字段"SEGMENT1"。<br>编辑时，按照已保存的数据进行编辑新增 | VARCHAR | _ | Y | SEL_2 | Y | |
| 9 | 供应商简称 | supplierDesc | 取屏幕"C1_4"数据<br>根据"供应商编码SEGMENT1"字段到表"AP_SUPPLIERS"取"VENDOR_NAME" | VARCHAR | _ | _ | _ | - | |
| 10 | 工单状态 | workOrderStatus | 取屏幕"C1_5"屏幕配置数据 | VARCHAR | _ | Y | SEL_2 | Y | |
| 11 | 创建人 | createdBy | 根据登录账户user，创建人自动赋值 | VARCHAR | _ | Y | TXT_2 | - | |
| 12 | 创建日期 | createDate | 根据创建日期自动赋值 | Date | _ | Y | DATA | - | |
| 13 | 编辑人 | updatedBy | 根据登录账户user，编辑人自动赋值 | VARCHAR | _ | Y | TXT_2 | - | |
| 14 | 编辑日期 | updateDate | 根据编辑时间自动赋值 | Date | _ | Y | DATA | - | |
| 15 | 是否有效 | isActive | 勾选框，选择该配置条件生效，并可以运行该配置条件 | Boolean | Y | Y | BOOL | - | 是/否/NULL |

---

### 屏幕 2: C1_1 - 齐套规则计算配置表-组织配置屏幕

*   **屏幕编号**: C1_1
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-组织配置屏幕
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1屏幕，进行"组织"配置时的"抽屉"弹窗。由主屏幕C1点击"组织"字段触发。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动改给号 | VARCHAR | _ | _ | _ | - | |
| 2 | 是否启用 | isEnabled | 默认不勾选，当勾选时，即考虑所选组织的工单取值范围，支持多条件勾选，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |
| 3 | 组织ID | orgId | 初始化配置时，默认读取EBS全"组织"<br>配置值，支持勾选多组织，取EBS表"HR_ORGANIZATION_UNITS_V\'，值\'ORGANIZATION_CODE\'，在每次查询时，动态取EBS组织清单 | VARCHAR | _ | Y | SEL_2 | Y | |
| 4 | 组织 | orgName | 通过组织ID 获取 | VARCHAR | Y | Y | SEL_2 | - | |

---

### 屏幕 3: C1_2 - 齐套规则计算配置表-分类码配置屏幕

*   **屏幕编号**: C1_2
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-分类码配置屏幕
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1屏幕，进行"分类码"配置时的"抽屉"弹窗。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动赋值 | VARCHAR | _ | _ | _ | - | |
| 2 | 是否有效 | isActive | 默认不勾选，勾选时，考虑对应条件的工单类型，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |
| 3 | 组织 | orgName | 根据分类码，取分类码，对应"组织" | VARCHAR | Y | Y | SEL_2 | Y | |
| 4 | 分类码 | categoryCode | 配置值，支持勾选多个值，取EBS表"WIP_ACCOUNTING_CLASSES",值"CLASS_CODE"，根据所选配置组织，取出所有相应组织的"分类码" | VARCHAR | _ | Y | SEL_2 | Y | |

---

### 屏幕 4: C1_3 - 齐套规则计算配置表-供给仓位配置

*   **屏幕编号**: C1_3
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-供给仓位配置
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1屏幕，进行"分类码"配置时的"抽屉"弹窗。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 组织 | orgName | 获取EBS表"MRP_SCHEDULE_DESIGNATORS"，字段"ORGANIZATION_CODE"，根据所选配置组织，取出所有相应组织的"组织" | VARCHAR | Y | Y | SEL_2 | Y | |
| 2 | EBS供给仓位配置 | calcSubInvNetValueName | 配置值，支持勾选多个值，取EBS表"MRP_SCHEDULE_DESIGNATORS"，字段"SCHEDULE_DESIGNATOR"，根据所选配置组织，取出所有相应组织的"计算子库存净值名称" | VARCHAR | _ | Y | SEL_2 | Y | |
| 3 | EBS供给仓位配置说明 | calcSubInvNetValueDesc | 取EBS表"MRP_SCHEDULE_DESIGNATORS"，字段"DESCRIPTION_MIR" | VARCHAR | _ | _ | _ | - | |
| 4 | 是否有效 | isActive | 默认不勾选，勾选时，考虑对应条件的仓位，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |

---

### 屏幕 5: C1_3_1 - 齐套规则计算配置表-供给仓位配置-仓位选择

*   **屏幕编号**: C1_3_1
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-供给仓位配置-仓位选择
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1_3屏幕，点击"EBS供给仓位配置"字段，弹出的"抽屉"弹窗。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 组织 | orgName | 取EBS表"MRP_SUB_INVENTORIES"，字段"ORGANIZATION_CODE"，根据所选配置组织，取出所有相应组织的"组织" | VARCHAR | Y | Y | SEL_2 | Y | |
| 2 | EBS供给仓位配置 | calcSubInvNetValueName | 取EBS表"MRP_SUB_INVENTORIES"，字段"SECONDARY_INVENTORY_NAME"，根据所选配置组织，取出所有相应组织的"子库存" | VARCHAR | _ | Y | SEL_2 | Y | |
| 3 | EBS供给仓位配置说明 | calcSubInvNetValueDesc | 取EBS表"MRP_SUB_INVENTORIES"，字段"DESCRIPTION" | VARCHAR | _ | _ | _ | - | |
| 4 | 仓位名称 | locationCode | 取EBS表"MRP_SUB_INVENTORIES"，字段"SECONDARY_INVENTORY_NAME" | VARCHAR | Y | Y | SEL_2 | - | |
| 5 | 仓位说明 | locationName | 取EBS表"MRP_SUB_INVENTORIES"，字段"DESCRIPTION" | VARCHAR | _ | _ | _ | - | |
| 6 | 是否有效 | isActive | 默认不勾选，勾选时，考虑对应条件的仓位，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |

---

### 屏幕 6: C1_4 - 齐套规则计算配置表-供应商配置屏幕

*   **屏幕编号**: C1_4
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-供应商配置屏幕
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1屏幕，进行"供应商"配置时的"抽屉"弹窗。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 组织 | orgName | 取EBS表"AP_SUPPLIERS"，字段"ORG_ID"，根据所选配置组织，取出所有相应组织的"组织" | VARCHAR | Y | Y | SEL_2 | Y | |
| 2 | 供应商编码 | supplierCode | 配置值，支持勾选多个值，取EBS表"AP_SUPPLIERS"，字段"SEGMENT1"，根据所选配置组织，取出所有相应组织的"供应商编码" | VARCHAR | _ | Y | SEL_2 | Y | |
| 3 | 供应商简称 | supplierDesc | 取EBS表"AP_SUPPLIERS"，字段"VENDOR_NAME" | VARCHAR | _ | _ | _ | - | |
| 4 | 是否有效 | isActive | 默认不勾选，勾选时，考虑对应条件的供应商，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |

---

### 屏幕 7: C1_5 - 齐套规则计算配置表-工单状态配置屏幕

*   **屏幕编号**: C1_5
*   **类型**: 弹窗
*   **屏幕名称**: 齐套规则计算配置表-工单状态配置屏幕
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、确认、取消、勾选框，全选/反选
*   **字段功能**: 基础查询
*   **屏幕间关系**: 在C1屏幕，进行"工单状态"配置时的"抽屉"弹窗。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动赋值 | VARCHAR | _ | _ | _ | - | |
| 2 | 工单状态 | workOrderStatus | 配置值，支持勾选多个值，取EBS表"WIP_DISCRETE_JOBS"，字段"STATUS_TYPE"，根据所选配置组织，取出所有相应组织的"工单状态" | VARCHAR | _ | Y | SEL_2 | Y | |
| 3 | 是否有效 | isActive | 默认不勾选，勾选时，考虑对应条件的工单状态，表头列字段，支持一键全选，取消全选 | Boolean | Y | Y | BOOL | Y | |

---

### 屏幕 8: C2 - 工单齐套优先级维护表

*   **屏幕编号**: C2
*   **类型**: 表格
*   **屏幕名称**: 工单齐套优先级维护表
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、保存、删除、行项编辑、新增
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 优先级维护界面。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | _ | _ | _ | - | |
| 2 | 组织 | orgName | 下拉选择，单选，取EBS组织数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 3 | 产品线 | productLine | 下拉选择，单选，取EBS产品线数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 4 | 产品类别 | productCategory | 下拉选择，单选，取EBS产品类别数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 5 | 产品PN | productPn | 输入框，支持模糊查询，取EBS产品PN数据 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 6 | 工单优先级 | workOrderPriority | 下拉选择，单选，HIGH/MEDIUM/LOW | INT | Y | Y | NUM | Y | - |
| 7 | 工单分类 | workOrderCategory | 下拉选择，单选，取EBS工单分类数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 8 | 工单状态 | workOrderStatus | 下拉选择，单选，取EBS工单状态数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 9 | 订单类型 | orderType | 下拉选择，单选，取EBS订单类型数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 10 | 客户 | customerName | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 11 | 客户编码 | customerCode | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 12 | 销售订单号 | salesOrderNo | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 13 | 工单号 | workOrderNo | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 14 | 料号 | materialCode | 输入框，支持模糊查询，取EBS料号数据 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 15 | 物料描述 | materialDes | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 16 | 组件物料 | componentMaterialCode | 输入框，支持模糊查询，取EBS组件物料数据 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 17 | 组件物料描述 | componentMaterialDesc | 输入框，支持模糊查询 | VARCHAR | Y | Y | TXT_2 | Y | - |
| 18 | 组件责任方 | componentResponsibleParty | 下拉选择，单选，取组件责任方配置数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 19 | 零部件类别 | componentCategory | 下拉选择，单选，取EBS零部件类别数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 20 | 组件分类 | componentType | 下拉选择，单选 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 21 | 是否资源 | isResource | 下拉选择，单选，Y/N | Boolean | Y | Y | SEL_1 | Y | - |
| 22 | 发料仓 | issueWarehouse | 下拉选择，单选，取EBS仓库数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 23 | 分类码 | categoryCode | 下拉选择，单选，取EBS分类码数据 | VARCHAR | Y | Y | SEL_2 | Y | - |
| 24 | 创建人 | createdBy | 系统自动赋值 | VARCHAR | Y | Y | TXT_2 | - | - |
| 25 | 创建日期 | createDate | 系统自动赋值 | Date | Y | Y | DATA | - | - |
| 26 | 修改人 | updatedBy | 系统自动赋值 | VARCHAR | Y | Y | TXT_2 | - | - |
| 27 | 修改日期 | updateDate | 系统自动赋值 | Date | Y | Y | DATA | - | - |
| 28 | 是否有效 | isActive | 勾选框 | Boolean | Y | Y | BOOL | Y | - |

---

### 屏幕 9: C3 - 组件责任方配置

*   **屏幕编号**: C3
*   **类型**: 表格
*   **屏幕名称**: 组件责任方配置
*   **数据来源**: EBS
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 组件责任方配置维护界面。

#### 详细字段列表

| 编号 | 字段名称 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 零部件类别 | componentCategory | 取EBS物料主数据的零部件类别，下拉选择，单选 | VARCHAR | Y | _ | SEL_2 | Y | - |
| 2 | 组件类别 | componentType | 人工维护 | VARCHAR | Y | _ | SEL_2 | Y | - |
| 3 | 组件责任人 | componentResponsibleParty | 人工维护 | VARCHAR | Y | _ | TXT_2 | Y | - |
| 4 | 创建时间 | createDate | 系统自动赋值 | Date | _ | _ | _ | - | - |
| 5 | 修改时间 | updateDate | 系统自动赋值 | Date | _ | _ | _ | - | - |
| 6 | 修改人 | updatedBy | 系统自动赋值 | VARCHAR | Y | _ | TXT_2 | - | - |

---

### 屏幕 10: H1 - 齐套明细运行历史记录表

*   **屏幕编号**: H1
*   **类型**: 表格
*   **屏幕名称**: 齐套明细运行历史记录表
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、重置
*   **字段功能**: 基础查询、字段自定义升降序
*   **屏幕间关系**: M1/M2/M3屏幕，点击"配置编码"跳转到当前屏幕；在当前屏幕点击"配置编码"跳转到M1屏幕。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | N | |
| 2 | 配置编码 | configCode | 按照齐套运行明细的运行次数，存入每次的运行数据，按版本号迭代，通过在M1/M2/M3屏幕，跳转到该屏幕。通过在该屏幕，点击"配置编码"跳转到对应行项目"版本"的明细数据 | VARCHAR | Y | Y | TXT_1 | N | M1/M2/M3屏幕，点击"配置编码"跳转到当前屏幕；在当前屏幕点击"配置编码"跳转到M1屏幕 |
| 3 | 运行时间 | runTime | 通过"配置编码"获取 | Date | - | Y | DATA | N | |
| 4 | 最后运行人 | lastRunBy | 通过"配置编码"获取 | VARCHAR | - | Y | TXT_2 | N | |
| 5 | 齐套版本 | VerSion | 根据配置编码，的运行的次数，自动赋值，叠加，配置编码&版本号，不能重复 | INT | - | Y | NUM | N | |

---

### 屏幕 11: M1 - 工单齐套明细

*   **屏幕编号**: M1
*   **类型**: 表格
*   **屏幕名称**: 工单齐套明细
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 主查询界面。点击"工单号"进入M2工单详情；点击"料号"进入M3物料详情；点击"供给明细-PO"进入T1；点击"供给明细-PR"进入T2；点击"供给明细-WO"弹出M1_1抽屉；点击"配置编码"跳转到H1屏幕。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 齐套版本 | VerSion | 配置编码获取&运行时间 | INT | - | Y | NUM | - | |
| 3 | 配置编码 | configCode | 查询时，必填项，下拉选择，单选，取"齐套规则计算配置表"的"配置编码" | VARCHAR | Y | Y | TXT_1 | - | |
| 4 | 组织 | orgName | 通过"配置编码"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 5 | 工单号 | workOrderNo | 通过"配置编码"获取，点击可跳转到"M2 工单齐套-工单详情" | VARCHAR | Y | Y | TXT_1 | - | |
| 6 | 料号 | materialCode | 通过"配置编码"获取，点击可跳转到"M3 工单齐套-物料详细" | VARCHAR | Y | Y | TXT_1 | - | 物料编码 |
| 7 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 8 | 产品PN | productPn | 通过"工单号"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 9 | 产品线 | productLine | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 10 | 产品类别 | productCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 11 | 容量 | capacity | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 12 | 工单优先级 | workOrderPriority | 在"工单优先级维护"表内通过"工单号"获取 | INT | Y | Y | NUM | - | |
| 13 | 工单状态 | workOrderStatus | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 14 | 工单分类 | workOrderCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 15 | 分类码 | categoryCode | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 16 | 订单类型 | orderType | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 17 | 订单编号 | orderNo | 通过"工单号"获取 | VARCHAR | Y | Y | TXT_1 | - | |
| 18 | 下单数量 | orderQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 19 | 未完成数量 | incompleteQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 20 | 已完工数量 | completedQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 21 | 报废数量 | scrapQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 22 | 要求完成日期 | requiredCompletionDate | 通过"工单号"获取 | Date | Y | Y | DATA | - | |
| 23 | 要求齐料日期（起始(MRP)日期） | requiredMaterialDate | 获取 工单号-起始(MRP)日期M_SCHEDULED_START_DATE | Date | - | Y | DATA | - | |
| 24 | 预计齐料日期 | estimatedMaterialReadyDate | 取 组件中"预计齐料日期" 最大的日期 | Date | - | Y | DATA | - | |
| 25 | 实际齐料日期 | actualMaterialReadyDate | 工单齐套后，自动赋值 | Date | Y | Y | DATA | - | |
| 26 | 组件物料 | componentMaterialCode | 点击可跳转到"M3 工单齐套-物料详细" | VARCHAR | Y | Y | TXT_1 | - | 组件物料编码 |
| 27 | 组件物料描述 | componentMaterialDesc | 通过"组件物料"获取 | VARCHAR | - | - | - | - | |
| 28 | 零部件类别 | componentCategory | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 29 | 组件分类 | componentType | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 30 | 是否资源 | isResource | 通过"组件物料"获取 | Boolean | - | Y | SEL_1 | - | Y/N |
| 31 | 组件责任方 | componentResponsibleParty | 在"组件责任方配置"表内通过"组件物料"获取 | VARCHAR | Y | Y | TXT_2 | - | |
| 32 | 单位用量 | unitUsage | 通过"工单号"和"组件物料"获取 | VARCHAR | - | Y | NUM | - | |
| 33 | 产出率 | yieldRate | 通过"组件物料"获取 | VARCHAR | - | Y | NUM | - | 如0.98表示98% |
| 34 | 叠die数 | dieStackQty | 通过"组件物料"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 35 | LT | componentLeadTime | 通过"组件物料"获取 | VARCHAR | - | Y | NUM | - | 单位：天 |
| 36 | 发料仓 | issueWarehouse | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | 仓库编码和名称 |
| 37 | 现存数量 | onHandQty | 取"计算子库存净值"的库存数量 | VARCHAR | - | Y | NUM | - | |
| 38 | 可用量 | availableQty | 现存数量 - 已分配量 | VARCHAR | - | Y | NUM | - | |
| 39 | 理论可用库存 | theoreticalAvailableStock | 取"计算子库存净值"的"可用库存数量" | VARCHAR | - | Y | NUM | - | |
| 40 | 理论可用库存(含PO&工单) | theoreticalAvailableStockInclPoWo | 理论可用库存 + PO在途数量 + 工单在制数量 | VARCHAR | - | Y | NUM | - | |
| 41 | 可用库存缺料数 | availableStockShortageQty | 工单未完成数量 * 单位用量 - 理论可用库存 | VARCHAR | - | Y | NUM | - | |
| 42 | 配置库存数量 | configInventoryQty | 取"计算子库存净值名称 下级配置表"的"库存数量" | VARCHAR | - | Y | NUM | - | |
| 43 | 已发料量 | issuedQty | 通过"工单号"和"组件物料"获取 | VARCHAR | - | Y | NUM | - | |
| 44 | 未发料数量 | unIssuedQty | 工单未完成数量 * 单位用量 - 已发料量 | VARCHAR | - | Y | NUM | - | |
| 45 | 已承诺数量 | CommittedQty | PO已承诺数量 + PR已承诺数量 + WO已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 46 | 已承诺物料齐套数 | committedKitQty | 已发料量 + 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 47 | 已承诺物料最小齐套数 | committedMinKitQty | min(已发料量, 已承诺数量) | VARCHAR | - | Y | NUM | - | |
| 48 | 工单当前齐套数 | committedSumQty | 已发料量 + 已承诺数量 + 理论可用库存 | VARCHAR | - | Y | NUM | - | |
| 49 | 已发料齐套数 | issuedKitQty | 已发料量 / 单位用量 | VARCHAR | - | Y | NUM | - | |
| 50 | 已发料数量齐套数 | issuedQtyKitQty | 已发料量 / 单位用量 | VARCHAR | - | Y | NUM | - | 为避免重复可替换为 issuedKitQty |
| 51 | 剩余齐套数 | remainingKitQty | 工单未完成数量 - 已发料齐套数 | VARCHAR | - | Y | NUM | - | |
| 52 | 未齐套数 | unKitQty | 工单未完成数量 - 工单当前齐套数 | VARCHAR | - | Y | NUM | - | |
| 53 | 工单缺料数量 | woShortageQty | 工单未完成数量 * 单位用量 - 理论可用库存 - 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 54 | 是否齐套 | isKitComplete | 工单当前齐套数 >= 工单未完成数量 ? 是 : 否 | Boolean | Y | Y | BOOL | - | 齐套/不齐套 |
| 55 | 齐套进度 | kitProgress | 工单当前齐套数 / 工单未完成数量 | VARCHAR | - | - | NUM | - | 比例0~1或百分数字符串 |
| 56 | 是否存在替代料 | hasAlternativeMaterial | 是/否 | Boolean | - | Y | BOOL | - | 是/否/空 |
| 57 | 替代料及库存 | alternativeMaterialStock | 点击弹出"T3 替代料明细"抽屉 | _ | _ | _ | _ | - | 前端渲染用，无实际字段，超链接 |
| 58 | 供给明细 | supplyDetails | PO/PR/WO三个tab，点击跳转到对应屏幕 | _ | _ | _ | _ | - | 前端渲染用，无实际字段 |
| 59 | 转单人 | transferBy | 通过"工单号"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 60 | 转单时间 | transferTime | 通过"工单号"获取 | Date | - | Y | DATA | - | |
| 61 | 转单数量 | transferQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 62 | 最后运行人 | lastRunBy | 通过"配置编码"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 63 | 运行时间 | runTime | 通过"配置编码"获取 | Date | - | Y | DATA | - | |

---

### 屏幕 12: M1_1 - WO工单信息表

*   **屏幕编号**: M1_1
*   **类型**: 抽屉
*   **屏幕名称**: WO工单信息表
*   **数据来源**: EBS
*   **屏幕功能**: 查询、导出
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 在"M1 工单齐套明细" 和 "工单齐套-物料详细"屏幕，点击"供给明细-WO" 弹出抽屉。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 组织 | orgName | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 3 | 料号 | materialCode | 输入行项目料号 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 4 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 5 | 工单号 | workOrderNo | 通过屏幕"M2 工单齐套明细"选择的"供给明细-WO"跳转到该屏幕<br>WO：<br>输入 行项"组件编码"&"组织"<br>从"工单信息表内"筛选出满足以下条件的记录<br>物料编码 = 输入行项目料号<br>且 工单状态="已发放"or"未发放"<br>取查询到数据的"剩余数量M_QUANTITY_REMAINING"、"起始完成日期M_SCHEDULED_COMPLETION_DATE" | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 6 | 工单类型 | workOrderType | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 7 | 工单状态 | workOrderStatus | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 8 | 工单优先级 | workOrderPriority | 在"工单优先级维护"表内通过"工单号"获取 | INT | N/A | N/A | N/A | - | 读EBS数据 |
| 9 | 转单人 | transferBy | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 10 | 转单时间 | transferTime | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 11 | 转单数量 | transferQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 12 | 已完工数量 | completedQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 13 | 报废数量 | scrapQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 14 | 未完成数量 | incompleteQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 15 | 供应商编码 | supplierCode | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 16 | 供应商简称 | supplierDesc | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 17 | 要求齐料日期（起始(MRP)日期） | requiredMaterialDate | 获取 工单号-起始(MRP)日期M_SCHEDULED_START_DATE | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 18 | 要求完成日期 | requiredCompletionDate | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 19 | 预计完成日期 | estimatedCompletionDate | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 20 | 实际完成日期 | actualCompletionDate | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 21 | 计划开工日期 | scheduledStartDate | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 22 | 实际开工日期 | actualStartDate | 通过"工单号"获取 | Date | N/A | N/A | N/A | - | 读EBS数据 |
| 23 | 计划数量 | scheduledQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 24 | 已发料数量 | issuedQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 25 | 未发料数量 | unIssuedQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 26 | 单位用量 | unitUsage | 通过"工单号"和"组件物料"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |
| 27 | 剩余数量 | remainingQty | 通过"工单号"获取 | VARCHAR | N/A | N/A | N/A | - | 读EBS数据 |

---

### 屏幕 13: M2 - 工单齐套-工单详情

*   **屏幕编号**: M2
*   **类型**: 表格
*   **屏幕名称**: 工单齐套-工单详情
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 由M1点击"工单号"进入。点击"组件物料"进入M2_1工单组件信息抽屉。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 配置编码 | configCode | 从M1屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 3 | 组织 | orgName | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 4 | 工单号 | workOrderNo | 从M1屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 5 | 工单类型 | workOrderType | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 6 | 工单状态 | workOrderStatus | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 7 | 工单优先级 | workOrderPriority | 在"工单优先级维护"表内通过"工单号"获取 | INT | Y | Y | NUM | - | |
| 8 | 工单分类 | workOrderCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 9 | 分类码 | categoryCode | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 10 | 订单类型 | orderType | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 11 | 订单编号 | orderNo | 通过"工单号"获取 | VARCHAR | Y | Y | TXT_1 | - | |
| 12 | 下单数量 | orderQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 13 | 未完成数量 | incompleteQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 14 | 已完工数量 | completedQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 15 | 报废数量 | scrapQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 16 | 产品PN | productPn | 通过"工单号"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 17 | 产品线 | productLine | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 18 | 产品类别 | productCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 19 | 容量 | capacity | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 20 | 料号 | materialCode | 通过"工单号"获取 | VARCHAR | Y | Y | TXT_1 | - | 物料编码 |
| 21 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 22 | 要求完成日期 | requiredCompletionDate | 通过"工单号"获取 | Date | Y | Y | DATA | - | |
| 23 | 要求齐料日期（起始(MRP)日期） | requiredMaterialDate | 获取 工单号-起始(MRP)日期M_SCHEDULED_START_DATE | Date | - | Y | DATA | - | |
| 24 | 预计齐料日期 | estimatedMaterialReadyDate | 取 组件中"预计齐料日期" 最大的日期 | Date | - | Y | DATA | - | |
| 25 | 实际齐料日期 | actualMaterialReadyDate | 工单齐套后，自动赋值 | Date | Y | Y | DATA | - | |
| 26 | 组件数量 | componentCount | 工单组件的数量 | INT | - | - | - | - | |
| 27 | 已齐套组件数 | kitCompleteComponentCount | 已齐套的组件数量 | INT | - | - | - | - | |
| 28 | 未齐套组件数 | unKitComponentCount | 未齐套的组件数量 | INT | - | - | - | - | |
| 29 | 齐套进度 | kitProgress | 已齐套组件数 / 组件数量 | VARCHAR | - | - | NUM | - | 比例0~1或百分数字符串 |
| 30 | 是否齐套 | isKitComplete | 未齐套组件数 = 0 ? 是 : 否 | Boolean | Y | Y | BOOL | - | 齐套/不齐套 |
| 31 | 转单人 | transferBy | 通过"工单号"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 32 | 转单时间 | transferTime | 通过"工单号"获取 | Date | - | Y | DATA | - | |
| 33 | 转单数量 | transferQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 34 | 最后运行人 | lastRunBy | 通过"配置编码"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 35 | 运行时间 | runTime | 通过"配置编码"获取 | Date | - | Y | DATA | - | |
| 36 | 组件物料 | componentMaterialCode | 点击弹出"M2_1 工单齐套-工单详细-工单组件信息"抽屉 | VARCHAR | Y | Y | TXT_1 | - | 组件物料编码 |
| 37 | 组件物料描述 | componentMaterialDesc | 通过"组件物料"获取 | VARCHAR | - | - | - | - | |
| 38 | 组件责任方 | componentResponsibleParty | 在"组件责任方配置"表内通过"组件物料"获取 | VARCHAR | Y | Y | TXT_2 | - | |

---

### 屏幕 14: M2_1 - 工单齐套-工单详细-工单组件信息

*   **屏幕编号**: M2_1
*   **类型**: 抽屉
*   **屏幕名称**: 工单齐套-工单详细-工单组件信息
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 由M2点击"组件物料"弹出抽屉。点击"料号"跳转到M3；点击"替代料及库存"弹出T3替代料明细抽屉。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 配置编码 | configCode | 从M2屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 3 | 组织 | orgName | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 4 | 工单号 | workOrderNo | 从M2屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 5 | 组件物料 | componentMaterialCode | 从M2屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | 组件物料编码 |
| 6 | 组件物料描述 | componentMaterialDesc | 通过"组件物料"获取 | VARCHAR | - | - | - | - | |
| 7 | 零部件类别 | componentCategory | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 8 | 组件分类 | componentType | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 9 | 是否资源 | isResource | 通过"组件物料"获取 | Boolean | - | Y | SEL_1 | - | Y/N |
| 10 | 组件责任方 | componentResponsibleParty | 在"组件责任方配置"表内通过"组件物料"获取 | VARCHAR | Y | Y | TXT_2 | - | |
| 11 | 单位用量 | unitUsage | 通过"工单号"和"组件物料"获取 | VARCHAR | - | Y | NUM | - | |
| 12 | 产出率 | yieldRate | 通过"组件物料"获取 | VARCHAR | - | Y | NUM | - | 如0.98表示98% |
| 13 | 叠die数 | dieStackQty | 通过"组件物料"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 14 | LT | componentLeadTime | 通过"组件物料"获取 | VARCHAR | - | Y | NUM | - | 单位：天 |
| 15 | 发料仓 | issueWarehouse | 通过"组件物料"获取 | VARCHAR | - | Y | SEL_2 | - | 仓库编码和名称 |
| 16 | 现存数量 | onHandQty | 取"计算子库存净值"的库存数量 | VARCHAR | - | Y | NUM | - | |
| 17 | 可用量 | availableQty | 现存数量 - 已分配量 | VARCHAR | - | Y | NUM | - | |
| 18 | 理论可用库存 | theoreticalAvailableStock | 取"计算子库存净值"的"可用库存数量" | VARCHAR | - | Y | NUM | - | |
| 19 | 理论可用库存(含PO&工单) | theoreticalAvailableStockInclPoWo | 理论可用库存 + PO在途数量 + 工单在制数量 | VARCHAR | - | Y | NUM | - | |
| 20 | 可用库存缺料数 | availableStockShortageQty | 工单未完成数量 * 单位用量 - 理论可用库存 | VARCHAR | - | Y | NUM | - | |
| 21 | 配置库存数量 | configInventoryQty | 取"计算子库存净值名称 下级配置表"的"库存数量" | VARCHAR | - | Y | NUM | - | |
| 22 | 已发料量 | issuedQty | 通过"工单号"和"组件物料"获取 | VARCHAR | - | Y | NUM | - | |
| 23 | 未发料数量 | unIssuedQty | 工单未完成数量 * 单位用量 - 已发料量 | VARCHAR | - | Y | NUM | - | |
| 24 | 已承诺数量 | CommittedQty | PO已承诺数量 + PR已承诺数量 + WO已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 25 | 已承诺物料齐套数 | committedKitQty | 已发料量 + 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 26 | 已承诺物料最小齐套数 | committedMinKitQty | min(已发料量, 已承诺数量) | VARCHAR | - | Y | NUM | - | |
| 27 | 工单当前齐套数 | committedSumQty | 已发料量 + 已承诺数量 + 理论可用库存 | VARCHAR | - | Y | NUM | - | |
| 28 | 已发料齐套数 | issuedKitQty | 已发料量 / 单位用量 | VARCHAR | - | Y | NUM | - | |
| 29 | 剩余齐套数 | remainingKitQty | 工单未完成数量 - 已发料齐套数 | VARCHAR | - | Y | NUM | - | |
| 30 | 未齐套数 | unKitQty | 工单未完成数量 - 工单当前齐套数 | VARCHAR | - | Y | NUM | - | |
| 31 | 工单缺料数量 | woShortageQty | 工单未完成数量 * 单位用量 - 理论可用库存 - 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 32 | 是否齐套 | isKitComplete | 工单当前齐套数 >= 工单未完成数量 ? 是 : 否 | Boolean | Y | Y | BOOL | - | 齐套/不齐套 |
| 33 | 齐套进度 | kitProgress | 工单当前齐套数 / 工单未完成数量 | VARCHAR | - | - | NUM | - | 比例0~1或百分数字符串 |
| 34 | 是否存在替代料 | hasAlternativeMaterial | 是/否 | Boolean | - | Y | BOOL | - | 是/否/空 |
| 35 | 替代料及库存 | alternativeMaterialStock | 点击弹出"T3 替代料明细"抽屉 | _ | _ | _ | _ | - | 前端渲染用，无实际字段，超链接 |
| 36 | 供给明细 | supplyDetails | PO/PR/WO三个tab，点击跳转到对应屏幕 | _ | _ | _ | _ | - | 前端渲染用，无实际字段 |

---

### 屏幕 15: M3 - 工单齐套-物料详细

*   **屏幕编号**: M3
*   **类型**: 表格
*   **屏幕名称**: 工单齐套-物料详细
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 由M1点击"料号"进入。点击"工单号"弹出M3_1物料关联工单信息抽屉。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 配置编码 | configCode | 从M1屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 3 | 组织 | orgName | 通过"料号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 4 | 料号 | materialCode | 从M1屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | 物料编码 |
| 5 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 6 | 零部件类别 | componentCategory | 通过"料号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 7 | 组件分类 | componentType | 通过"料号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 8 | 是否资源 | isResource | 通过"料号"获取 | Boolean | - | Y | SEL_1 | - | Y/N |
| 9 | 组件责任方 | componentResponsibleParty | 在"组件责任方配置"表内通过"料号"获取 | VARCHAR | Y | Y | TXT_2 | - | |
| 10 | 发料仓 | issueWarehouse | 通过"料号"获取 | VARCHAR | - | Y | SEL_2 | - | 仓库编码和名称 |
| 11 | 现存数量 | onHandQty | 取"计算子库存净值"的库存数量 | VARCHAR | - | Y | NUM | - | |
| 12 | 可用量 | availableQty | 现存数量 - 已分配量 | VARCHAR | - | Y | NUM | - | |
| 13 | 理论可用库存 | theoreticalAvailableStock | 取"计算子库存净值"的"可用库存数量" | VARCHAR | - | Y | NUM | - | |
| 14 | 理论可用库存(含PO&工单) | theoreticalAvailableStockInclPoWo | 理论可用库存 + PO在途数量 + 工单在制数量 | VARCHAR | - | Y | NUM | - | |
| 15 | 配置库存数量 | configInventoryQty | 取"计算子库存净值名称 下级配置表"的"库存数量" | VARCHAR | - | Y | NUM | - | |
| 16 | 关联工单数 | relatedWorkOrderCount | 关联的工单数量 | INT | - | - | - | - | |
| 17 | 已齐套工单数 | kitCompleteWorkOrderCount | 已齐套的工单数量 | INT | - | - | - | - | |
| 18 | 未齐套工单数 | unKitWorkOrderCount | 未齐套的工单数量 | INT | - | - | - | - | |
| 19 | 总需求数量 | totalDemandQty | 所有工单的需求数量之和 | VARCHAR | - | Y | NUM | - | |
| 20 | 总已发料量 | totalIssuedQty | 所有工单的已发料量之和 | VARCHAR | - | Y | NUM | - | |
| 21 | 总已承诺数量 | totalCommittedQty | 所有工单的已承诺数量之和 | VARCHAR | - | Y | NUM | - | |
| 22 | 是否存在替代料 | hasAlternativeMaterial | 是/否 | Boolean | - | Y | BOOL | - | 是/否/空 |

---

### 屏幕 16: M3_1 - 工单齐套-物料详情-物料关联工单信息

*   **屏幕编号**: M3_1
*   **类型**: 抽屉
*   **屏幕名称**: 工单齐套-物料详情-物料关联工单信息
*   **数据来源**: DOP存表
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 由M3点击"工单号"弹出抽屉。点击"工单号"跳转到M2。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 配置编码 | configCode | 从M3屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | |
| 3 | 组织 | orgName | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 4 | 工单号 | workOrderNo | 从M3屏幕带入，点击可跳转到"M2 工单齐套-工单详情" | VARCHAR | Y | Y | TXT_1 | - | |
| 5 | 工单类型 | workOrderType | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 6 | 工单状态 | workOrderStatus | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 7 | 工单优先级 | workOrderPriority | 在"工单优先级维护"表内通过"工单号"获取 | INT | Y | Y | NUM | - | |
| 8 | 工单分类 | workOrderCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 9 | 分类码 | categoryCode | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 10 | 订单类型 | orderType | 通过"工单号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 11 | 订单编号 | orderNo | 通过"工单号"获取 | VARCHAR | Y | Y | TXT_1 | - | |
| 12 | 下单数量 | orderQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 13 | 未完成数量 | incompleteQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 14 | 已完工数量 | completedQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 15 | 报废数量 | scrapQty | 通过"工单号"获取 | VARCHAR | - | Y | NUM | - | |
| 16 | 产品PN | productPn | 通过"工单号"获取 | VARCHAR | - | Y | TXT_2 | - | |
| 17 | 产品线 | productLine | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 18 | 产品类别 | productCategory | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 19 | 容量 | capacity | 通过"工单号"获取 | VARCHAR | - | Y | SEL_2 | - | |
| 20 | 料号 | materialCode | 从M3屏幕带入 | VARCHAR | Y | Y | TXT_1 | - | 物料编码 |
| 21 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 22 | 单位用量 | unitUsage | 通过"工单号"和"料号"获取 | VARCHAR | - | Y | NUM | - | |
| 23 | 需求数量 | demandQty | 工单未完成数量 * 单位用量 | VARCHAR | - | Y | NUM | - | |
| 24 | 已发料量 | issuedQty | 通过"工单号"和"料号"获取 | VARCHAR | - | Y | NUM | - | |
| 25 | 未发料数量 | unIssuedQty | 需求数量 - 已发料量 | VARCHAR | - | Y | NUM | - | |
| 26 | 已承诺数量 | CommittedQty | PO已承诺数量 + PR已承诺数量 + WO已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 27 | 已承诺物料齐套数 | committedKitQty | 已发料量 + 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 28 | 工单当前齐套数 | committedSumQty | 已发料量 + 已承诺数量 + 理论可用库存 | VARCHAR | - | Y | NUM | - | |
| 29 | 已发料齐套数 | issuedKitQty | 已发料量 / 单位用量 | VARCHAR | - | Y | NUM | - | |
| 30 | 剩余齐套数 | remainingKitQty | 工单未完成数量 - 已发料齐套数 | VARCHAR | - | Y | NUM | - | |
| 31 | 未齐套数 | unKitQty | 工单未完成数量 - 工单当前齐套数 | VARCHAR | - | Y | NUM | - | |
| 32 | 工单缺料数量 | woShortageQty | 需求数量 - 理论可用库存 - 已承诺数量 | VARCHAR | - | Y | NUM | - | |
| 33 | 是否齐套 | isKitComplete | 工单当前齐套数 >= 工单未完成数量 ? 是 : 否 | Boolean | Y | Y | BOOL | - | 齐套/不齐套 |

---

### 屏幕 17: T1 - SRM PO交期报表

*   **屏幕编号**: T1
*   **类型**: 表格
*   **屏幕名称**: SRM PO交期报表
*   **数据来源**: SRM
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 在"M1 工单齐套明细" 和 "工单齐套-物料详细"屏幕，点击"供给明细-PO" 跳转表格。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 组织 | orgName | 通过"料号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 3 | 料号 | materialCode | 输入行项目料号 | VARCHAR | Y | Y | TXT_1 | - | |
| 4 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 5 | PO号 | poNo | 从SRM获取 | VARCHAR | Y | Y | TXT_1 | - | |
| 6 | PO行号 | poLineNo | 从SRM获取 | VARCHAR | - | Y | TXT_2 | - | |
| 7 | 供应商编码 | supplierCode | 从SRM获取 | VARCHAR | - | Y | SEL_2 | - | |
| 8 | 供应商简称 | supplierDesc | 从SRM获取 | VARCHAR | - | - | - | - | |
| 9 | 订单数量 | orderQty | 从SRM获取 | VARCHAR | - | Y | NUM | - | |
| 10 | 已收货数量 | receivedQty | 从SRM获取 | VARCHAR | - | Y | NUM | - | |
| 11 | 未收货数量 | unreceivedQty | 订单数量 - 已收货数量 | VARCHAR | - | Y | NUM | - | |
| 12 | 已承诺数量 | committedQty | 从SRM获取 | VARCHAR | - | Y | NUM | - | |
| 13 | 承诺交期 | committedDeliveryDate | 从SRM获取 | Date | - | Y | DATA | - | |
| 14 | 要求交期 | requiredDeliveryDate | 从SRM获取 | Date | - | Y | DATA | - | |
| 15 | 预计到货日期 | estimatedArrivalDate | 从SRM获取 | Date | - | Y | DATA | - | |
| 16 | 实际到货日期 | actualArrivalDate | 从SRM获取 | Date | - | Y | DATA | - | |
| 17 | PO状态 | poStatus | 从SRM获取 | VARCHAR | - | Y | SEL_2 | - | |
| 18 | 采购员 | buyer | 从SRM获取 | VARCHAR | - | Y | TXT_2 | - | |
| 19 | 创建日期 | createDate | 从SRM获取 | Date | - | Y | DATA | - | |

---

### 屏幕 18: T2 - PR信息表

*   **屏幕编号**: T2
*   **类型**: 表格
*   **屏幕名称**: PR信息表
*   **数据来源**: EBS
*   **屏幕功能**: 查询、导出、重置
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 在"M1 工单齐套明细" 和 "工单齐套-物料详细"屏幕，点击"供给明细-PR" 跳转表格。

#### 详细字段列表

| 编号 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 序号 | seqNo | 自动给号 | VARCHAR | - | - | - | - | |
| 2 | 组织 | orgName | 通过"料号"获取 | VARCHAR | Y | Y | SEL_2 | - | |
| 3 | 料号 | materialCode | 输入行项目料号 | VARCHAR | Y | Y | TXT_1 | - | |
| 4 | 物料描述 | materialDes | 通过"料号"获取 | VARCHAR | - | - | - | - | |
| 5 | PR号 | prNo | 从EBS获取 | VARCHAR | Y | Y | TXT_1 | - | |
| 6 | PR行号 | prLineNo | 从EBS获取 | VARCHAR | - | Y | TXT_2 | - | |
| 7 | 申请数量 | requisitionQty | 从EBS获取 | VARCHAR | - | Y | NUM | - | |
| 8 | 已批准数量 | approvedQty | 从EBS获取 | VARCHAR | - | Y | NUM | - | |
| 9 | 未批准数量 | unapprovedQty | 申请数量 - 已批准数量 | VARCHAR | - | Y | NUM | - | |
| 10 | 已转PO数量 | poTransferredQty | 从EBS获取 | VARCHAR | - | Y | NUM | - | |
| 11 | 未转PO数量 | unPoTransferredQty | 已批准数量 - 已转PO数量 | VARCHAR | - | Y | NUM | - | |
| 12 | 需求日期 | needByDate | 从EBS获取 | Date | - | Y | DATA | - | |
| 13 | 申请人 | requester | 从EBS获取 | VARCHAR | - | Y | TXT_2 | - | |
| 14 | 申请日期 | requisitionDate | 从EBS获取 | Date | - | Y | DATA | - | |
| 15 | 审批人 | approver | 从EBS获取 | VARCHAR | - | Y | TXT_2 | - | |
| 16 | 审批日期 | approvalDate | 从EBS获取 | Date | - | Y | DATA | - | |
| 17 | PR状态 | prStatus | 从EBS获取 | VARCHAR | - | Y | SEL_2 | - | |
| 18 | 说明 | description | 从EBS获取 | VARCHAR | - | Y | TXT_2 | - | |
| 19 | 单位 | unitOfMeasure | 从EBS获取 | VARCHAR | - | - | - | - | |
| 20 | 单价 | unitPrice | 从EBS获取 | VARCHAR | - | Y | NUM | - | |

---

#### 屏幕 19: T3 - 替代料明细

*   **屏幕编号**: T3
*   **类型**: 抽屉
*   **屏幕名称**: 替代料明细
*   **数据来源**: EBS
*   **屏幕功能**: 查询、导出
*   **字段功能**: 基础查询、高级查询、字段自定义升降序、自定义字段布局保存
*   **屏幕间关系**: 在"M2_1 工单齐套-工单详细-工单组件信息"屏幕，点击"替代料及库存" 弹出抽屉。

#### 详细字段列表

| 编号 | 屏幕结构 | 字段描述 | 字段名 | 字段逻辑 | 字符类型 | 基础查询 | 高级查询 | 查询方式 | 是否可编辑 | 备注 |
| ---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | head | 组织 | orgName | 在屏幕M1工单齐套明细，所选的组织，赋值 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 2 | head | 料号 | materialCode | 在屏幕M1工单齐套明细，点击所选行项的"料号"赋值 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 3 | head | 组件物料 | componentMaterialCode | 在屏幕M1工单齐套明细，点击所选行项的"组件物料"赋值 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 4 | head | 说明 | materialDes | 根据"组件料号"赋值 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 5 | head | 替代项 | alternativeItem | 按"组织"&"料号"&"组件料号"到EBS查相应BOM，取EBS ALTERNATE_BOM_DESIGNATOR_MIR，该字段业务提供选择，默认选择"Alternate"。获取EBS的数据，当选择数据后，ITEM数据根据选择后的数据更新到相关的替代料配置数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 6 | head | 版本 | version | 按"组织"&"料号"&"组件料号"到EBS查相应BOM，取EBS REVISION_MIR，该字段业务提供选择，默认选择"0"。获取EBS的数据，当选择数据后，ITEM数据根据选择后的数据更新到相关的替代料配置数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 7 | item | 料号 | materialCode | 在屏幕M1工单齐套明细，通过点击"替代料及库存"右侧抽屉弹窗，根据选择行项的"组织"&"料号"&"组件料号"到EBS查相应BOM，反查出行项"组件编码"&"替代项"&"版本" 关联的替代料"料号" | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 8 | item | 品牌 | brand | 根据"料号"，取物料主数据"品牌BRAND" | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 9 | item | 描述 | description | 根据"料号"，取物料主数据"说明 DESCRIPTION" | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 10 | item | 状态 | status | 根据"料号"，取EBS物料主数据"物料状态 ITEM_STATUS " | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 11 | item | L/T | leadTime | 根据"料号"，取EBS物料主数据"L/T   FIXED_DAYS_SUPPLY" | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 12 | item | 可用数量 | availableQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 13 | item | 客户预留数量 | customerReservedQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 14 | item | 现存数量 | onHandQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 15 | item | 工单可用数量 | woAvailableQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 16 | item | 保留数量 | reservedQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 17 | item | 单据保留数量 | documentReservedQty | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 18 | item | 是否资源 | isResource | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 19 | item | 产品线 | productLine | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 20 | item | 批次 | lot | 根据"料号"&"组织"取EBS库存数据 | N/A | N/A | N/A | N/A | N | 读EBS数据 |
| 21 | item | 供给明细 | supplyDetails | PR：<br>     输入 行项"组件编码"&"组织"，点击跳转到T1<br>      从"PR信息表" 筛选出满足以下条件的记录<br>      物料编码 = 输入行项目料号<br>      且 PR状态 = 打开<br>      取查询到数据的"下单数量"<br><br>PO：<br>    输入 行项"组件编码"&"组织"，点击跳转到T2<br>    从"SRM采购订单交期报表create table srm_po_allocation_lines" 筛选出满足以下条件的记录<br>    物料编码 = 输入行项目料号<br>    且 采购订单状态 = 打开<br>    取查询到数据的"承诺数量"<br><br>WO：<br>     输入 行项"组件编码" & "组织"，点击跳转到M1_1<br>     从"工单信息表内"筛选出满足以下条件的记录<br>     物料编码 = 输入行项目料号<br>     且 工单状态="已发放"or"未发放"<br>     取查询到数据的"剩余数量M_QUANTITY_REMAINING" 汇总 | N/A | N/A | N/A | N/A | N | 点击屏幕跳转 |