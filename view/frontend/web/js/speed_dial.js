define([
    'uiComponent',
    'ko',
    '@popperjs/core',
    'Caio_SpeedDial/js/libs/tippy',
], function(Component, ko, popper, tippy){
    const ICONS_MARGIN = 68
    const SPEED_DIAL_ITEMS_HEIGHT = 60
    const SPEED_DIAL_ITEMS_WIDTH = 60

    const tooltips = []

    return Component.extend({
        items: ko.observable(window.speedDialItems),
        
        defaults: {
            template: 'Caio_SpeedDial/speed_dial'
        },

        getItems: function(){
            return this.items()
        },

        texte: function(){
            alert('isndiasndi')
        },

        initSpeedDial: function(){
            const speedDialItemsWrapper = this.getSpeedDialItemsWrapper()
            const items = this.getSpeedDialItems()
            const itemsImgs = this.getSpeedDialItemsImgs()
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
        
        getSpeedDialItemsWrapper: function(){
            return document.getElementById('speed-dial-items')
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