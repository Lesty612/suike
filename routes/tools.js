/**
 * @author Lesty
 * @codeDate 2016.7.28
 * @description [工具模块]
 */

/**
 * @codeDate 2016.7.28
 * @desc[登录权限检测模块]
 */

/**
 * [checkNotLogin 用户如果没登录过则跳转到登录页，登录过则next()]
 */
function checkNotLogin(req, res, next) {
	if(!req.session.user) {
		return res.redirect('/#/login');
	}

	// 转移控制权
	next();
}

/**
 * [checkNotLogin 用户如果登录过则跳转到slect页，否则next()]
 */
function checkLogin(req, res, next) {
	if(req.session.user) {
		// 用户未选过书则跳到选书页
		// 否则跳到选单元页
		if(req.session.user.curBookId) {
			console.log('redirect /select');
			return res.redirect('/select');
		} else {
			console.log('redirect /select#/books');
			return res.redirect('/select#/books');
		}
	}

	// 转移控制权
	next();
}

function extend(targetObj, extendedObj) {
	for(var o in extendedObj) {
		targetObj[o] = extendedObj[o];
	}
}

module.exports.checkLogin = checkLogin;
module.exports.checkNotLogin = checkNotLogin;
module.exports.extend = extend;