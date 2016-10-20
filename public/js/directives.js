var typeDirectives = angular.module('typeDirectives', []);

typeDirectives.directive('stType1', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/type1.html',
		link: function(scope, element, attrs) {
			var curWord = scope.curWord;
			var regWord = '';
			var reg = null;

			if(curWord) {
				// 正则里需要查找的单词，由于担心单词可能会用ing和ed等变换形式
				// 将长度较长的单词截断后2位字母匹配，如果单词长度太短则不截取，以免匹配多个单词
				regWord = curWord.word.length > 5 ? curWord.word.slice(0, curWord.word.length - 2) : curWord.word,
				// 查找所有匹配的单词
				reg = new RegExp('\\b' + regWord + '\\w*', 'gi');
				element.find("#t1Sentence").html(curWord.sentence.replace(reg, "<span class='highlight-word'>" + curWord.sentence.match(reg) + "</span>"));
			}
		}
	}
});

typeDirectives.directive('stType2', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/type2.html',
		link: function(scope, element, attrs) {
			$('#picList').on('click.t2', 'li', function() {
				var $li = $(this),
					picSrc = $li.children('img').attr('src');
				
				// 增加做题次数
				scope.$parent.dt++;
				
				// 选择正确
				if(picSrc === scope.curWord.p2) {
					$li.addClass('right');

					setTimeout(function() {
						$li.removeClass('right');

						// 触发$digest循环
						scope.$apply(function() {
							// 进入下一题
							scope.toNextType();
						});
					}, 500);
				} else {
					// 错误
					$li.addClass('error');

					setTimeout(function() {
						$li.removeClass('error');
					}, 500);
				}
			});
		}
	}
});

typeDirectives.directive('stType3', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/type3.html',
		link: function(scope, element, attrs) {
			$('#meanList').on('click.t3', 'li', function() {
				var $li = $(this),
					wordMean = $li.text();

				// 增加做题次数
				scope.$parent.dt++;

				// 选择正确
				if(wordMean === scope.curWord.wordMean) {
					$li.addClass('right');

					setTimeout(function() {
						$li.removeClass('right');

						// 触发$digest循环
						scope.$apply(function() {
							// 进入下一题
							scope.toNextType();
						});
					}, 500);
				} else {
					// 错误
					$li.addClass('error');

					setTimeout(function() {
						$li.removeClass('error');
					}, 500);
				}
			});
		}
	}
});

typeDirectives.directive('stEnd', function() {
	return {
		restrict: 'EA',
		templateUrl: './templates/end.html',
		link: function(scope, element, attrs) {
			console.log('tp3 link');
		}
	}
});