try {
    CQ.Ext.ns("CCHPOT");

    CCHPOT.IllustratorCompositeField = CQ.Ext.extend(CQ.form.CompositeField, {
     
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
        nameField: null,
        NAME: "name",

       /**
        * @private
        * @type CQ.Ext.form.TextField
        */
        urlField: null,
        URL: "url",

        /**
        * @private
        * @type CQ.Ext.form.TextArea
        */
        bioField: null,
        BIO: "bio",
     
        // overriding CQ.Ext.Component#initComponent
        initComponent: function() {
            CCHPOT.IllustratorCompositeField.superclass.initComponent.call(this);

            //Hidden Field
            this.hiddenField = new CQ.Ext.form.Hidden({
                name: this.name
            });
     
            this.add(this.hiddenField);

            //Illustrator Image
            this.imageField = new CQ.form.PathField({
                fieldLabel: "Image",
                fieldDescription: "Illustrator image displayed in illustrators section",
                rootPath: "/content/dam",
                showTitlesInTree: false,
                width: 260,
                labelStyle: "display: initial;",
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.imageField);
     
            //Illustrator Name
            this.nameField = new CQ.Ext.form.TextField({
                fieldLabel: "Name",
                fieldDescription: "Illustrator name is displayed when the count of illustrator is only one",
                labelStyle: "display: initial;",
                style: {
                    "box-sizing": "border-box",
                    "width": "calc(100% - 103px)"
                },
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.nameField);

            //Illustrator Name URL
            this.urlField = new CQ.form.PathField({
                fieldLabel: "Name URL",
                fieldDescription: "Illustrator name URL is displayed when the count of illustrator is only one",
                showTitlesInTree: false,
                parBrowse: true,
    			linkPattern: "{0}.selector.html",
    			parLinkPattern: "{0}.selector.html#{1}",
                width: 260,
                labelStyle: "display: initial;",
                listeners: {
                    change: {
                        scope: this,
                        fn: this.updateHidden
                    }
                }
            });
            this.add(this.urlField);
     
            //Illustrator Biography
            this.bioField = new CQ.Ext.form.TextArea({
                fieldLabel: "Biography",
                fieldDescription: "Biography displayed when the count of the illustrator is more than one",
                labelStyle: "display: initial;",
                style: {
                    "box-sizing": "border-box",
                    "width": "calc(100% - 103px)"
                },
                listeners: {
                    change: {
                        scope:this,
                        fn:this.updateHidden
                    }
                }
            });
            this.add(this.bioField);
        },
     
        // overriding CQ.form.CompositeField#setValue
        setValue: function(value) {
            var valueJSON = JSON.parse(value);
            this.imageField.setValue(valueJSON[this.IMAGE]);
            this.nameField.setValue(valueJSON[this.NAME]);
            this.urlField.setValue(valueJSON[this.URL]);
            this.bioField.setValue(valueJSON[this.BIO]);
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
            value[this.NAME] = this.nameField.getValue();
            value[this.URL] = this.urlField.getValue();
            value[this.BIO] = this.bioField.getValue();

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
    CQ.Ext.reg("illustratorCompositeField", CCHPOT.IllustratorCompositeField);
}
catch (e) {
    // suppressing error.
    // error occurs for CQ.form.CompositeField in mobile devices.
}