/**
 * [services自定义服务]
 * @author Lesty
 * @codeDate 2016.5.16
 */

var globalInfoServices = angular.module('globalInfoServices', []);

globalInfoServices.factory('selectInfo', function() {
	var curBookId = 0, // 当前所选的教材ID
		curUnitId = 0, // 当前所选单元ID
		curPart = 0; // 当前所选部分

	/**
	 * [setter and getter]
	 */
	function getCurBookId() {
		return curBookId;
	}

	function setCurBookId(bookId) {
		curBookId = bookId;
	}

	function getCurUnitId() {
		return curUnitId;
	}

	function setCurUnitId(unitId) {
		curUnitId = unitId;
	}

	function getCurPart() {
		return curPart;
	}

	function setCurPart(part) {
		curPart = part;
	}

	return {
		getCurBookId: getCurBookId,
		setCurBookId: setCurBookId,
		getCurUnitId: getCurUnitId,
		setCurUnitId: setCurUnitId,
		getCurPart: getCurPart,
		setCurPart: setCurPart
	};
});