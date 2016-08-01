try {
    CQ.Ext.ns("CCHPOT");

    CCHPOT.MoreBooksCompositeField = CQ.Ext.extend(CQ.form.CompositeField, {
     
        /**
         * @private
         * @type CQ.Ext.form.Hidden
         */
        hiddenField: null,

        /**
        * @private
        * @type CQ.form.PathField
        */
        imageField: null,
        IMAGE: "image",
     
       /**
        * @private
        * @type CQ.Ext.form.TextField
        */
        titleField: null,
        TITLE: "title",
     
        /**
        * @private
        * @type CQ.form.ColorField
        */
        colorField: null,
        COLOR: "color",

        /**
        * @private
        * @type CQ.form.PathField
        */
        urlField: null,
        URL: "url",

        constructor: function(config) {
            config = config || { };
            var defaults = {
                "padding": 10,
                "style": "padding:10px 0 0 5px;",
                "layout": "form"
            };
        	config = CQ.Util.applyDefaults(config, defaults);
        	CCHPOT.MoreBooksCompositeField.superclass.constructor.call(this, config);
    	},
     
        // overriding CQ.Ext.Component#initComponent
        initComponent: function() {
            CCHPOT.MoreBooksCompositeField.superclass.initComponent.call(this);

            //Hidden Field
            this.hiddenField = new CQ.Ext.form.Hidden({
                name: this.name
            });
     
            this.add(this.hiddenField);

            //More books Image
            this.imageField = new CQ.form.PathField({
                fieldLabel: "Image",
                fieldDescription: "Image displayed in content promo",
                rootPath: "/content/dam",
                showTitlesInTree: false,
                labelStyle: "display: initial;",
                width: 230,
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.imageField);
     
            //More books Title
            this.titleField = new CQ.Ext.form.TextField({
                fieldLabel: "Title",
                fieldDescription: "Title displayed in content promo",
                labelStyle: "display: initial;",
                width: 230,
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.titleField);
     
            //More books Color
            this.colorField = new CQ.form.ColorField({
                fieldLabel: "Color",
                fieldDescription: "Color of Title Font displayed in content promo",
                labelStyle: "display: initial;",
                showHexValue: true,
                width: 230,
                listeners: {
                    change: {
                        scope:this,
                        fn:this.updateHidden
                    }
                }
            });
            this.add(this.colorField);

            //More books URL
            this.urlField = new CQ.form.PathField({
                fieldLabel: "URL",
                fieldDescription: "URL displayed in content promo",
                parBrowse: true,
                showTitlesInTree: false,
                labelStyle: "display: initial;",
                width: 230,
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    },
                    dialogselect: {
                    	scope: this,
                    	fn: this.updateHidden
                	}
                }
            });
            this.add(this.urlField);
        },
     
        // overriding CQ.form.CompositeField#setValue
        setValue: function(value) {
            var valueJSON = JSON.parse(value);
            this.imageField.setValue(valueJSON[this.IMAGE]);
            this.titleField.setValue(valueJSON[this.TITLE]);
            this.colorField.setValue(valueJSON[this.COLOR]);
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
            value[this.IMAGE] = this.imageField.getValue();
            value[this.TITLE] = this.titleField.getValue();
            value[this.COLOR] = this.colorField.getValue();
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
    CQ.Ext.reg("moreBooksCompositeField", CCHPOT.MoreBooksCompositeField);
}
catch (e) {
    // suppressing error.
    // error occurs for CQ.form.CompositeField in mobile devices.
}