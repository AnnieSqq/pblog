### 0. 模型概述

#### 1. 介绍那些暗示今年先成为我从您新世纪年西安市小娜姐说可能性暗示健康小

以前的模型：直接寻找**有关变量之间的关系**建立**函数表达式**

但在自然科学，工程，经济，医学等学科中的许多系统优势**很难找到**变量之间的关系，但比较容易找打这些**变量**和它们**微小增量**或**变化率**之间的关系式。这是通常使用**微分关系式**来描述系统，即建立**微分方程模型**

微分方程：含有**函数**及其**导数**的方程

**导数**：瞬时变化率

> 实际中用来描述变化的词有：
>
> - 速率（物理）
> - 增长率（经济，生物，人口等）
> - 衰变（原子反应）
> - 边际的（经济）
>
> 瞬时变化率的描述：
>
> - 绝对增加率：单位时间增加的量
> - 相对增加率：单位时间增加的百分比
>
> > **变化率** = 增加率-减少率

如果方程（组）只含有一个自变量（通常是时间t），则成为**常微分方程**，否则称为偏微分方程

#### 2. 建模详述

1. 模型用法
   - 描述对象特征随时间（空间）的演变过程
   - 分析对象特征的变化规律
   - 预报对象特征的未来形态
   - 控制研究对象特征的手段
2. 常见建模方法：
   - 机理分析
   - 微元法
   - 模型近似法

### 1. 传染病模型

#### 1. 模型分析

1. 目标

   - 描述传染病的传播过程
   - 分析受感染人数的变化规律
   - 预报传染病高峰期到来的时刻
   - 预防传染病蔓延的手段

2. 基本方法

   不是从医学角度分析传染机理，而是按照传播过程的一般规律来建立数学模型

#### 2. 模型一：简单模型

1. 假设：

   - 在$t$ 时刻已感人的人数为 $i(t)$ 
   - 每个病人每天的有效接触（即足以传染给对方的接触）人数为 $\lambda$ 

2. 建模：

   $i(t+\Delta t)-i(t) = \lambda i(t)\Delta t$ 

   $\Longrightarrow \cfrac{i(t+\Delta t-i(t))}{\Delta t} = \lambda i(t)\Longrightarrow\cfrac{di}{dt} = \lambda i$ 

   $\Longrightarrow \lambda i = i' \Longrightarrow i = i_0e^{\lambda t}$ 

   其中，$i(0) = i_0$ 

   $\Longrightarrow t\to +\infty\text{时},i \to +\infty$ 



问题：如果有效接触的是病人，则必能传染给对方，因此要区分病人和非病人

#### 3. 模型2：SI模型

1. 假设：

   - 总人数不变，病人和健康人的**比例**分别为$i(t)$和$s(t)$ 
   - 日接触率$\lambda$ ：每个病人每天有效接触的人数为$\lambda$ 且只使其中的健康人致病

2. 建模：

   过了$\Delta t$ 天增加的人数： $\not N[i(t+\Delta t)-i(t)] = \lambda*\not Ni(t)*\Delta t*s(t)$ 

   $\Longrightarrow \cfrac{di}{dt} = \lambda si$ ，$i(t)+s(t) = 1$ 
   $$
   \Longrightarrow
   \begin{cases}
   \cfrac{di}{dt} = \lambda i(1-i)\\
   i(0) = i_0
   \end{cases}
   $$
   解微分方程得：
   $$
   \cfrac{1}{1+\left(\cfrac1{i_0}-1\right)e^{-\lambda t}}
   $$
   ![image-20200329145213433](%E7%AC%AC%E4%BA%94%E7%AB%A0%20%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E6%A8%A1%E5%9E%8B.assets/image-20200329145213433.png)

   ![image-20200329145315542](%E7%AC%AC%E4%BA%94%E7%AB%A0%20%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E6%A8%A1%E5%9E%8B.assets/image-20200329145315542.png)

3. 问题：病人全部都会被感染不合理，应该加入病人可以被治愈的条件

#### 4. 模型3：SIS模型

1. 假设：

   - 病人治愈后不会获得免疫，成为健康人之后有效接触下会再次感染
   - 日治愈率$\mu$ ：病人每天被治愈的比例为$\mu$ 

2. 建模：

   $\Delta t$天新增的病人人数为：$\not N[i(t+\Delta t)-i(t)] = \lambda*\not Ni(t)*\Delta t*s(t)-\mu*\Delta t*\not Ni(t)$ 

   $\Longrightarrow \cfrac{di}{dt} = \lambda i(1-i)-\mu i$ 

   设$\sigma = \cfrac \lambda\mu \Longrightarrow \cfrac{di}{dt} = -\lambda i[i-(1-\cfrac1\sigma)]$ 

   $\lambda$：日接触率；$\cfrac1\mu$：感染期（如果得病了被治愈所需要的时间，可以仔细想一下，应该没问题）；$\sigma$：一个感染期内每个病人的有效接触人数，称为**接触数** 

   ![image-20200329152455883](%E7%AC%AC%E4%BA%94%E7%AB%A0%20%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%E6%A8%A1%E5%9E%8B.assets/image-20200329152455883.png)
   $$
   i(\infty) = 
   \begin{cases}
   1-\cfrac1\sigma,&\sigma>1 &i(t)\text{按照S型增长}\\
   0,&\sigma\leq1 &i(t)\text{从}i_0\text{下降到0}
   \end{cases}
   $$

3. SI模型看作SIS模型的特例：也就是病人不会治愈，表明感染期无限长，那么一个人在感染期内感染的人数就是无穷大，即$\sigma = +\infty$ 

#### 5. 模型4：SIR模型

1. 假设：

   - 治愈后有免疫性，因此只有雨后就被移出感染系统
   - 总人数N不变，病人，健康人和移出者的比例分别为：$i(t),s(t),r(t)$ 
   - 日接触率：$\lambda$ ；日治愈率：$\mu$ ；接触数：$\sigma = \lambda/\mu$ ，$i(t)+s(t)+r(t) = 1$ 

2. 建模：
   $$
   
   $$
   

   