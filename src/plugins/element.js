import Vue from 'vue'
import {
  Aside,
  Backtop,
  Button,
  Card,
  Col,
  Container,
  Drawer,
  Footer,
  Header,
  Input,
  Main,
  Row,
  Select,
  Tooltip,
  Tree,
  Scrollbar,
  Dialog,
  Avatar,
  Pagination,
  Timeline,
  TimelineItem,
  Tag,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Message,
  Checkbox,
  Table,
  TableColumn,
  Form,
  FormItem,
  Option
} from 'element-ui'

Vue.use(Button)
// 布局
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
// 卡片
Vue.use(Card)
// 回到顶部
Vue.use(Backtop)
// 表单
Vue.use(Input)
Vue.use(Select)
// 抽屉
Vue.use(Drawer)
// 树形控件
Vue.use(Tree)
// 文字提示
Vue.use(Tooltip)
// 滚动条
Vue.use(Scrollbar)
// 对话框
Vue.use(Dialog)
// 头像
Vue.use(Avatar)
// 分页
Vue.use(Pagination)
// 时间线
Vue.use(Timeline)
Vue.use(TimelineItem)
// 标签
Vue.use(Tag)

// 菜单
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
// 表单
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
// 表格
Vue.use(Table)
Vue.use(TableColumn)
// 挂载项
Vue.prototype.$message = Message
