'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var as = function () {
	var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
		return _regenerator2.default.wrap(function _callee$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee, this);
	}));

	return function as() {
		return _ref2.apply(this, arguments);
	};
}();

var _type = require('type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(generator);

function generator(_ref) {
	var id = _ref.id,
	    type = _ref.type;
	var code;
	return _regenerator2.default.wrap(function generator$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					code = type.code;
					return _context.abrupt('return', {});

				case 2:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked, this);
}