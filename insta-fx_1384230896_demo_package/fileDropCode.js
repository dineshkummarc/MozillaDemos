var opts = {
    dragClass: "drag",
    accept: false,
    readAsMap: {
        'image/*': 'DataURL',
        'text/*' : 'Text'
    },
    readAsDefault: 'BinaryString',
    on: {
        beforestart: function(e, file) {
        	// return false if you want to skip this file
			//alert(file.type);
			//if(file.type.indexOf("/image/") == -1){
    		//return false;
			//}

    	},
        loadstart: function(e, file) {
        	// Native ProgressEvent

    	},
        progress: function(e, file) {
        	// Native ProgressEvent

    	},
        load: function(e, file) {
        	// Native ProgressEvent
			setDraggedImage(e,file);

    	},
        error: function(e, file) {
        	// Native ProgressEvent

    	},
        loadend: function(e, file) {
        	// Native ProgressEvent

    	},
        abort: function(e, file) {
        	// Native ProgressEvent

    	},
        skip: function(e, file) {
        	// Called when a file is skipped.  This happens when:
        	// 	1) A file doesn't match the accept option
        	// 	2) false is returned in the beforestart callback
    	},
        groupstart: function(group) {

    	},
        groupend: function(group) {

    	}
    }
};