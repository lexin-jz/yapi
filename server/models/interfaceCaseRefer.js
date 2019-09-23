const yapi = require('../yapi.js');
const baseModel = require('./base.js');

/**
 * 测试用例引用表
 */
class interfaceCaseRefer extends baseModel {
  getName() {
    return 'interface_case_refer';
  }

  getSchema() {
    return {
      uid: { type: Number, required: true },
      refer_caseid: { type: Number, required: true },
      col_id: { type: Number, required: true },
      project_id: { type: Number, required: true },
      add_time: Number,
      up_time: Number,
      index: { type: Number, default: 0 }
    };
  }

  save(data) {
    let m = new this.model(data);
    return m.save();
  }

  get(id) {
    return this.model
      .findOne({
        _id: id
      })
      .exec();
  }


  referColList(project_id, case_id) {
    return this.model
      .find({
        project_id,
        refer_caseid: case_id
      })
      .sort({ index: 1 })
      .exec();
  }


  caseReferListByCol(project_id, col_id) {
    return this.model
      .find({
        project_id,
        col_id
      })
      .sort({ index: 1 })
      .exec();
  }
  // 删除该用例的所有映射
  delAllByCaseid(project_id, refer_caseid) {
    return this.model.deleteMany({
      project_id,
      refer_caseid
    });
  }
  // 解除单个映射
  del(id) {
    return this.model.deleteOne({
        _id: id
      });
  }
}

module.exports = interfaceCaseRefer;