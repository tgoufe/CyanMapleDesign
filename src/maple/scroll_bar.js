import log from './log';
export default function() {
	var argv = arguments.length
		, body = document.body
		, doc = document.documentElement
		, curr = 0
		, total = 1
		, view = 1
		, regexp = /^(\d+(?:\.\d+)?)(%|view)?$/
		, temp
		;

	if (argv === 1) {   // 读操作
		body = document.body;
		doc = document.documentElement;

		switch (arguments[0]) {
			case 'top':
				total = body.scrollHeight;
				curr = body.scrollTop;
				view = doc.clientHeight;
				break;
			case 'bottom':
				total = body.scrollHeight;
				view = doc.clientHeight;
				curr = total - body.scrollTop - view;
				break;
			case 'left':
				total = body.scrollWidth;
				curr = body.scrollLeft;
				view = doc.clientWidth;
				break;
			case 'right':
				total = body.scrollWidth;
				view = doc.clientWidth;
				curr = total - body.scrollLeft - view;
				break;
			default:
				break;
		}

		return {
			px: curr
			, percent: Math.floor(curr / total * 100)
			, view: parseFloat((curr / view).toFixed(1))
		};
	}
	else {   // 写操作
		temp = regexp.exec(arguments[1]);

		if (temp) {
			switch (arguments[0]) {
				case 'top':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = curr * body.scrollHeight / 100;
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = curr * doc.clientHeight;
					}

					body.scrollTop = curr;
					break;
				case 'bottom':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = Math.max(body.scrollHeight * (1 - curr / 100), 0);
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = Math.max(body.scrollHeight - curr * doc.clientHeight, 0);
					}

					body.scrollTop = curr;
					break;
				case 'left':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = curr * body.scrollWidth / 100;
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = curr * doc.clientWidth;
					}

					body.scrollLeft = curr;
					break;
				case 'right':
					curr = parseFloat(temp[1]);

					if (temp[2] === '%') {  // 百分比
						curr = Math.max(body.scrollWidth * (1 - curr / 100), 0);
					}
					else if (temp[2] === 'view') {  // 屏数
						curr = Math.max(body.scrollWidth - curr * doc.clientWidth, 0);
					}

					body.scrollLeft = curr;
					break;
				default:
					break;
			}

			switch (temp[2]) {

			}

			if (temp[2] === '%') {  // 百分比
				total = body.scrollHeight / 100;
			}
			else if (temp[2] === 'view') {  // 屏数
				total = doc.clientHeight;
			}
			else {
				total = 1;
			}

			body[curr] = parseFloat(temp[1]) * total;
		}
		else {
			log('scrollBar 参数设置错误');
		}
	}
}