/* 
	This file is part of the "jQuery.Menu" project, and is licensed under the GNU AGPLv3.

	Copyright 2010 Samuel Williams. All rights reserved.

	For more information, please see http://www.oriontransfer.co.nz/software/jquery-syntax

	This program is free software: you can redistribute it and/or modify it under the terms
	of the GNU Affero General Public License as published by the Free Software Foundation,
	either version 3 of the License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
	See the GNU General Public License for more details.

	You should have received a copy of the GNU Affero General Public License along with this
	program. If not, see <http://www.gnu.org/licenses/>.
*/

jQuery.fn.menu = function (options) {
	options = options || {};
	var itemSelector = options.item || 'li';
	var menuSelector = options.menu || '.menu';
	
	var showFunction = options.show || function(menu, first) {
		menu.fadeIn(200);
	};
	
	var hideFunction = options.hide || function(menu, last) {
		menu.fadeOut(last ? 200 : 100);
	};
	
	$(this).each(function() {
		var active = null;
		
		$(this).children(itemSelector).each(function() {
			var menu = $(menuSelector, this);
			var timeout = null;
			
			menu.clearTimeout = function () {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
			}
			
			menu.showMenu = function () {
				var first = true;
				
				if (active && active !== menu) {
					active.hideMenu(true);
					first = false;
				}
				
				showFunction(menu, first);
				
				menu.clearTimeout();
				
				active = menu;
			}
			
			menu.hideMenu = function (immediately) {
				if (immediately) {
					menu.clearTimeout();
					active = null;
					hideFunction(menu, false);
				} else {
					if (!timeout) {
						timeout = setTimeout(function() {
							hideFunction(menu, true);
							timeout = null;
							active = null;
						}, 500);
					}
				}
			}
			
			$(this).hover(function() {
				menu.showMenu();
			}, function() {
				menu.hideMenu();
			});
		});
	});
};
