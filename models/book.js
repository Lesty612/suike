var mongodb = require('./db'),
	ObjectID = require('mongodb').ObjectID;

function Book(book) {
	this.name = book.name;
	this.editionId = book.editionId;
	this.progress = book.progress;
};

/**
 * [save 保存教材]
 */
Book.prototype.save = function(callback) {
	var book = {
		name: this.name,
		editionId: ObjectID(this.editionId),
		progress: this.progress
	};

	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('books', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			col.insertOne(book, {safe: true}, function(err) {
				mongodb.close();

				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
};

/**
 * [get 获取教材]
 */
Book.get = function(bookId, callback) {
	bookId = ObjectID(bookId);
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('books', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			col.findOne({
				_id: bookId
			}, function(err, book) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				book._id = book._id.toHexString();
				callback(null, book);
			});
		});
	});
};

/**
 * [getAllByEditionId 获取所有出版社id为editionId的教材]
 */
Book.getAllByEditionId = function(editionId, callback) {
	editionId = ObjectID(editionId);
	mongodb.open(function(err, db) {
		if(err) {
			return callback(err);
		}

		db.collection('books', function(err, col) {
			if(err) {
				mongodb.close();
				return callback(err);
			}

			// 获取books集合里所有文档
			col.find({editionId: editionId}).toArray(function(err, books) {
				mongodb.close();
				if(err) {
					return callback(err);
				}

				callback(null, books);
			});	
		});
	});
};

module.exports = Book;