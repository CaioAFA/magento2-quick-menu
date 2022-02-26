define([
    'uiComponent',
    'ko',
    'Caio_SpeedDial/js/libs/tippy',
], function(Component, ko, tippy){
    const tooltips = []

    var ICONS_MARGIN
    var IMAGE_PATH = 'speed_dial_icon/'
    var isOpened = false

    return Component.extend({
        items: ko.observable(window.speedDialItems),
        adjustedItems: ko.observable(false),

        defaults: {
            template: 'Caio_SpeedDial/speed_dial'
        },

        getItems: function(){
            if(this.adjustedItems()){
                console.log(this.items())
                return this.items()
            }

            let items = this.items()

            for(let i = 0; i < items.length; i++){
                const item = items[i]

                if(item.image){
                    item.image = JSON.parse(item.image).map((i) => i.name)[0]
                    item.image = window.speedDialConfig.mediaPath + IMAGE_PATH + item.image
                }
            }

            this.adjustedItems(true)
            return items
        },

        isModuleEnabled: function(){
            const isEnabled = window.speedDialConfig.isEnabled != 0 ? true : false
            return isEnabled
        },

        initSpeedDial: function(){
            ICONS_MARGIN = window.speedDialConfig.iconsMargin
            var SPEED_DIAL_ITEMS_HEIGHT = window.speedDialConfig.iconSize
            var SPEED_DIAL_ITEMS_WIDTH = window.speedDialConfig.iconSize
            var SPEED_DIAL_LEFT_DISTANCE = window.speedDialConfig.leftDistance
            var SPEED_DIAL_BOTTOM_DISTANCE = window.speedDialConfig.bottomDistance
            var ICON_IMAGE = window.speedDialConfig.iconImage
            var BACKGROUND_ICON_COLOR = window.speedDialConfig.iconImageBackground

            const speedDialWrapper = this.getSpeedDialWrapper()
            speedDialWrapper.style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
            speedDialWrapper.style.right = `${SPEED_DIAL_LEFT_DISTANCE}px`
            speedDialWrapper.style.bottom = `${SPEED_DIAL_BOTTOM_DISTANCE}px`

            const items = this.getSpeedDialItems()
            const itemsImgs = this.getSpeedDialItemsImgs()
            
            const speedDialMainIconImg = this.getSpeedDialMainIconImg()
            speedDialMainIconImg.style.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.style.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.src = ICON_IMAGE

            const speedDialItemsWrapper = this.getSpeedDialItemsWrapper()
            speedDialItemsWrapper.style.height = `${ICONS_MARGIN * (items.length + 1)}px`
        
            const mainIconWrapper = this.getSpeedDialMainIcon()
            mainIconWrapper.style.background = BACKGROUND_ICON_COLOR
            mainIconWrapper.onclick = () => {
                this.toggleSpeedDial()
            }
        
            for(let i = 0; i < items.length; i++){
                items[i].style.height = `${SPEED_DIAL_ITEMS_HEIGHT}px`
                items[i].style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
                items[i].onclick = this.openLink
            }

            for(let i = 0; i < itemsImgs.length; i++){
                itemsImgs[i].height = SPEED_DIAL_ITEMS_HEIGHT
                itemsImgs[i].width = SPEED_DIAL_ITEMS_WIDTH
                itemsImgs[i].style.background = itemsImgs[i].getAttribute('data-background') ?? 'white'
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

        toggleSpeedDial: function(){
            if(isOpened){
                this.hideSpeedDialItems()
            }
            else{
                this.showSpeedDialItems()
            }

            isOpened = !isOpened
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

        getSpeedDialMainIcon: function(){
            return document.querySelector('#speed-dial-main-icon')
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
    });
});