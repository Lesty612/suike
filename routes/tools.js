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
		return res.redirect('/select');
	}

	// 转移控制权
	next();
}

module.exports.checkLogin = checkLogin;
module.exports.checkNotLogin = checkNotLogin;