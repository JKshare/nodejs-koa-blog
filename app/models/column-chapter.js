const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Column} = require('../models/column')

// 定义专栏章节模型
class ColumnChapter extends Model {

}

// 初始文章模型
ColumnChapter.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏章节标题'
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '专栏章节索引'
  },
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'column_chapter',
  tableName: 'column_chapter'
})

// 专栏与专栏章节关联
Column.hasMany(ColumnChapter, {
  foreignKey: 'column_id', sourceKey: 'id', as: 'column_chapter'
})
ColumnChapter.belongsTo(Column, {
  foreignKey: 'column_id', targetKey: 'id', as: 'column'
})

module.exports = {
  ColumnChapter
}
