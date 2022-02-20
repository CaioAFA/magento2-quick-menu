define([
    'uiComponent',
    'ko',
    '@popperjs/core',
    'Caio_SpeedDial/js/libs/tippy',
], function(Component, ko, popper, tippy){
    const tooltips = []

    var ICONS_MARGIN 
    var SPEED_DIAL_ITEMS_HEIGHT
    var SPEED_DIAL_ITEMS_WIDTH

    return Component.extend({
        items: ko.observable(window.speedDialItems),
        
        defaults: {
            template: 'Caio_SpeedDial/speed_dial'
        },

        getItems: function(){
            return this.items()
        },

        isModuleEnabled: function(){
            const isEnabled = window.speedDialConfig.isEnabled != 0 ? true : false
            return isEnabled
        },

        initSpeedDial: function(){
            ICONS_MARGIN = window.speedDialConfig.iconsMargin
            SPEED_DIAL_ITEMS_HEIGHT = window.speedDialConfig.iconSize
            SPEED_DIAL_ITEMS_WIDTH = window.speedDialConfig.iconSize
        
            const speedDialWrapper = this.getSpeedDialWrapper()
            speedDialWrapper.style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`

            const speedDialItemsWrapper = this.getSpeedDialItemsWrapper()
            const items = this.getSpeedDialItems()
            const itemsImgs = this.getSpeedDialItemsImgs()
            
            const speedDialMainIconImg = this.getSpeedDialMainIconImg()
            speedDialMainIconImg.style.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.style.height = SPEED_DIAL_ITEMS_HEIGHT

            speedDialItemsWrapper.style.height = `${ICONS_MARGIN * (items.length + 1)}px`
        
            const mainIcon = this.getMainIcon()
            mainIcon.width = SPEED_DIAL_ITEMS_WIDTH
            mainIcon.height = SPEED_DIAL_ITEMS_HEIGHT
        
            for(let i = 0; i < items.length; i++){
                items[i].style.height = `${SPEED_DIAL_ITEMS_HEIGHT}px`
                items[i].style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
            }

            for(let i = 0; i < itemsImgs.length; i++){
                itemsImgs[i].height = SPEED_DIAL_ITEMS_HEIGHT
                itemsImgs[i].width = SPEED_DIAL_ITEMS_WIDTH
                items[i].onclick = this.openLink
            }
        },
        
        showSpeedDialItems: function(){
            const items = this.getSpeedDialItems()

            for(let i = 0; i < items.length; i++){
                items[i].style.bottom = `${ICONS_MARGIN * (i + 1)}px`
            }
        
            this.enableItemsTooltips()
        },
        
        hideSpeedDialItems: function(){
            const items = this.getSpeedDialItems()
        
            for(let i = 0; i < items.length; i++){
                items[i].style.bottom = `0px`
            }
        
            this.disableItemsTooltips()
        },
        
        enableItemsTooltips: function(){
            const speedDialItems = this.getSpeedDialItems()
        
            if(tooltips.length){
                for(let i = 0; i < speedDialItems.length; i++){
                    tooltips[i].enable()
                }
            }
            else{	
                for(let i = 0; i < speedDialItems.length; i++){
                    tooltips.push(
                        tippy(speedDialItems[i], {
                            placement: 'right',
                            content: speedDialItems[i].getAttribute('data-text'),
                        })
                    );
                }
            }
        },

        disableItemsTooltips: function(){
            for(let i = 0; i < tooltips.length; i++){
                tooltips[i].disable()
            }
        },
        
        openLink: (el) => {
            window.open(el.target.dataset.link).focus()
        },

        getSpeedDialWrapper: function(){
            return document.getElementById('speed-dial-wrapper')
        },
        
        getSpeedDialItemsWrapper: function(){
            return document.getElementById('speed-dial-items')
        },

        getSpeedDialMainIconImg: function(){
            return document.querySelector('#speed-dial-main-icon img')
        },
        
        getSpeedDialItems: function(){
            return document.querySelectorAll('.speed-dial-item')
        },
        
        getSpeedDialItemsImgs: function(){
            return document.querySelectorAll('#speed-dial-items .speed-dial-item img')
        },
        
        getMainIcon: function(){
            return document.querySelector('#speed-dial-main-icon img')
        }
    });
});