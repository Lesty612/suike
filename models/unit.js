var mongodb = require('./db'),
	ObjectID = require('mongodb').ObjectID;

function Unit(unit) {
	this.hasLearned = unit.hasLearned,
	this.total = this.total;
	this.bookId = this.bookId;
}

// 获取单元信息
Unit.get = function(unitId, callback) {
	unitId = ObjectID(unitId); 
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('units', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			col.findOne({
				_id: unitId
			}, function(err, unit) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				unit._id = unitId._id.toHexString();
				callback(null, unit);
			});
		});
	});
};

/**
 * [getAllByBookId 获取书本id为bookId的所有单元]
 */
Unit.getAllByBookId = function(bookId, callback) {
	bookId = ObjectID(bookId);
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('units', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			// 获取units集合里所有文档
			col.find({bookId: bookId}).toArray(function(err, units) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				// 不需要进行id类型转换
				callback(null, units);
			});	
		});
	});
};

// 保存单元信息
Unit.prototype.save = function(callback) {
	var unit = {
		hasLearned: this.hasLearned,
		total: this.total,
		bookId: ObjectID(bookId)
	};

	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('units', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			col.insertOne(unit, {safe: true}, function(err) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
}

module.exports = Unit;
