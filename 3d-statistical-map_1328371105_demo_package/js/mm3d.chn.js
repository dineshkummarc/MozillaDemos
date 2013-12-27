/**
 * The China map script for megamap library.
 * @author Ye Jiabin <alpha360x@gmail.com>
 * @requires mm3d.core.js
 */

/**
 * The data for China's map
 */
mm3d.DataChina = function (newData) {
	mm3d.BaseData.call(this);
	this.model = {	
		 'Zhejiang'     : { data : 0, last : 1 } ,
		 'Jiangsu'      : { data : 0, last : 1 } ,
		 'Shandong'     : { data : 0, last : 1 } ,
		 'Anhui'        : { data : 0, last : 1 } ,
		 'Shanghai'     : { data : 0, last : 1 } ,
		 'Hebei'        : { data : 0, last : 1 } ,
		 'Jiangxi'      : { data : 0, last : 1 } ,
		 'Henan'        : { data : 0, last : 1 } ,
		 'Hainan'       : { data : 0, last : 1 } ,
		 'Taiwan'       : { data : 0, last : 1 } ,
		 'Hunan'        : { data : 0, last : 1 } ,
		 'Sichuan'      : { data : 0, last : 1 } ,
		 'Yunnan'       : { data : 0, last : 1 } ,
		 'Gansu'        : { data : 0, last : 1 } ,
		 'Xizang'       : { data : 0, last : 1 } ,
		 'Liaoning'     : { data : 0, last : 1 } ,
		 'Jilin'        : { data : 0, last : 1 } ,
		 'Heilongjiang' : { data : 0, last : 1 } ,
		 'Hubei'        : { data : 0, last : 1 } ,
		 'Shaanxi'      : { data : 0, last : 1 } ,
		 'Neimenggu'    : { data : 0, last : 1 } ,
		 'Guangxi'      : { data : 0, last : 1 } ,
		 'Qinghai'      : { data : 0, last : 1 } ,
		 'Ningxia'      : { data : 0, last : 1 } ,
		 'Xinjiang'     : { data : 0, last : 1 } ,
		 'Chongqing'    : { data : 0, last : 1 } ,
		 'Shanxi'       : { data : 0, last : 1 } ,
		 'Tianjing'     : { data : 0, last : 1 } ,
		 'Beijing'      : { data : 0, last : 1 } ,
		 'Guangdong'    : { data : 0, last : 1 } ,
		 'Guizhou'      : { data : 0, last : 1 } ,
		 'Hongkong'     : { data : 0, last : 1 } ,
		 'Macau'        : { data : 0, last : 1 } ,
		 'Fujian'       : { data : 0, last : 1 } 
	};
	this.length = 34;
	this.max = 0;

	if (newData !== undefined) {
		this.changeData(newData);
	}
};

mm3d.DataChina.prototype = new mm3d.BaseData();
mm3d.DataChina.prototype.constructor = mm3d.DataChina;

mm3d.ChinaMap = function (cont, data, config) {
	mm3d.AbstractMap.call(this, cont);

	this._vp = cont;
	this._dataModel = new mm3d.DataChina(data);

	this._initConfig.call(this, config); 
	this._urlPrefix = 'map/China/map';
	if (config !== undefined) {
		if (config['urlPrefix'] !== undefined) {
			this._urlPrefix = config['urlPrefix'];
		}
		if (config['maxval'] !== undefined) {
			this._dataModel.max = config['maxval'];
		}
	}
};

mm3d.ChinaMap.prototype = new mm3d.AbstractMap();

/*
mm3d.ChinaMap.prototype.init = function () {
	mm3d.AbstractMap.prototype.init.call(this);

};
*/

mm3d.ChinaMap.prototype.constructor = mm3d.ChinaMap;

