try {
    CQ.Ext.ns("CCHPOT");

    CCHPOT.VendorCompositeField = CQ.Ext.extend(CQ.form.CompositeField, {
     
        /**
         * @private
         * @type CQ.Ext.form.Hidden
         */
        hiddenField: null,
     
       /**
        * @private
        * @type CQ.Ext.form.TextField
        */
        nameField: null,
        NAME: "name",

        /**
        * @private
        * @type CQ.form.PathField
        */
        urlField: null,
        URL: "url",

        constructor: function(config) {
            config = config || { };
            var defaults = {
                "labelWidth": 40,
                "padding": 10,
                "style": "padding:10px 0 0 5px;",
                "layout": "form"
            };
        	config = CQ.Util.applyDefaults(config, defaults);
        	CCHPOT.VendorCompositeField.superclass.constructor.call(this, config);
    	},
     
        // overriding CQ.Ext.Component#initComponent
        initComponent: function() {
            CCHPOT.VendorCompositeField.superclass.initComponent.call(this);

            //Hidden Field
            this.hiddenField = new CQ.Ext.form.Hidden({
                name: this.name
            });
     
            this.add(this.hiddenField);

            //Vendor Name
            this.nameField = new CQ.Ext.form.TextField({
                fieldLabel: "Name",
                fieldDescription: "Vendor Name set as key in book data",
                width: 160,
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.nameField);

            //Vendor URL
            this.urlField = new CQ.form.PathField({
                fieldLabel: "URL",
                fieldDescription: "Vendor URL set as value in book data",
                parBrowse: true,
                showTitlesInTree: false,
                labelStyle: "display: initial;",
                width: 160,
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    },
                    dialogselect: {
                    	scope:this,
                    	fn:this.updateHidden
                	}
                }
            });
            this.add(this.urlField);
        },
     
        // overriding CQ.form.CompositeField#setValue
        setValue: function(value) {
            var valueJSON = JSON.parse(value);
            this.nameField.setValue(valueJSON[this.NAME]);
            this.urlField.setValue(valueJSON[this.URL]);
            this.hiddenField.setValue(value);
        },
     
        // overriding CQ.form.CompositeField#getValue
        getValue: function() {
            return this.getRawValue();
        },
     
        // overriding CQ.form.CompositeField#getRawValue
        getRawValue: function() {
            var value = {};
            value[this.NAME] = this.nameField.getValue();
            value[this.URL] = this.urlField.getValue();
            return JSON.stringify(value);
        },
     
        // private
        updateHidden: function() {
            this.hiddenField.setValue(this.getValue());
        },

        processValue: function(value) {        
            if ((value === undefined) || (value === null)) {
                value = "";
            }    
        	// calling updateHidden() as change event not functioning for RTE widget
            this.updateHidden();
            return value;                  
    	}
     
    });
     
    // register xtype
    CQ.Ext.reg("vendorCompositeField", CCHPOT.VendorCompositeField);
}
catch (e) {
    // suppressing error.
    // error occurs for CQ.form.CompositeField in mobile devices.
}