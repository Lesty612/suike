var typeDirectives = angular.module('typeDirectives', []);

typeDirectives.directive('stType1', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/type1.html',
		link: function(scope, element, attrs) {
			let curWord = scope.curWord,
				// 正则里需要查找的单词，由于担心单词可能会用ing和ed等变换形式
				// 将长度较长的单词截断后2位字母匹配，如果单词长度太短则不截取，以免匹配多个单词
				regWord = curWord.word.length > 5 ? curWord.word.slice(0, curWord.word.length - 2) : curWord.word,
				// 查找所有匹配的单词
				reg = new RegExp('\\b' + regWord + '\\w*', 'gi');

			element.find("#t1Sentence").html(curWord.sentence.replace(reg, "<span class='highlight-word'>" + curWord.sentence.match(reg) + "</span>"));
		}
	}
});

