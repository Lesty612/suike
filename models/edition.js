var mongodb = require('./db');

function Edition(edition) {
	this.name = name;
}

/**
 * [get 根据editionId获取版本]
 */
Edition.get = function(editionId, callback) {

};

/**
 * [getAll 获取所有版本信息(人教版等)]
 */
Edition.getAll = function(callback) {
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('editions', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			col.findOne(function(err, editions) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				callback(null, editions);
			});
		});
	});
}