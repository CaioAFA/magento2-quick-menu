define([
    'uiComponent',
    'ko',
    'Caio_SpeedDial/js/libs/tippy',
    'jquery'
], function(Component, ko, tippy, $){
    const tooltips = {}

    var ICONS_MARGIN
    const ANIMATION_DURATION = 500 // Milliseconds
    var isOpened = false

    return Component.extend({
        defaults: {
            template: 'Caio_SpeedDial/speed_dial'
        },

        getItems: function(){
            return window.speedDialItems
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

            const items = this.getSpeedDialItems()
            for(let i = 0; i < items.length; i++){
                items[i].style.height = `${SPEED_DIAL_ITEMS_HEIGHT}px`
                items[i].style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
                items[i].addEventListener('click', (e) => {
                    this.openLink(e)
                })
                items[i].addEventListener('touchstart', (e) => {
                    this.openLink(e)
                })
            }

            const itemsImgs = this.getSpeedDialItemsImgs()
            for(let i = 0; i < itemsImgs.length; i++){
                itemsImgs[i].height = SPEED_DIAL_ITEMS_HEIGHT
                itemsImgs[i].width = SPEED_DIAL_ITEMS_WIDTH
                itemsImgs[i].style.background = itemsImgs[i].getAttribute('data-background') ?? 'white'
                itemsImgs[i].addEventListener('mouseover', (element) => {
                    this.hideOtherTooltips(element)
                })
            }

            const speedDialWrapper = this.getSpeedDialWrapper()
            speedDialWrapper.style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
            speedDialWrapper.style.right = `${SPEED_DIAL_LEFT_DISTANCE}px`
            speedDialWrapper.style.bottom = `${SPEED_DIAL_BOTTOM_DISTANCE}px`

            const speedDialMainIconImg = this.getSpeedDialMainIconImg()
            speedDialMainIconImg.style.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.style.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.src = ICON_IMAGE
            speedDialMainIconImg.ontouchstart = (e) => {
                this.toggleSpeedDial()
                e.preventDefault() // Prevent "onclick" event
            }
            this.handleOuterTouchEvent()

            const mainIconWrapper = this.getSpeedDialMainIcon()
            mainIconWrapper.style.background = BACKGROUND_ICON_COLOR
            mainIconWrapper.onclick = () => {
                this.toggleSpeedDial()
            }

            const speedDialItemsWrapper = this.getSpeedDialItemsWrapper()
            speedDialItemsWrapper.style.height = `${ICONS_MARGIN * (items.length + 1)}px`
        },

        // When click away from div in mobile, close the speed dial
        handleOuterTouchEvent: function(){
            window.addEventListener('touchstart', (e) => {
                const speedDialWrapper = this.getSpeedDialWrapper()
                if(
                    e.path && e.path.length && e.path.length >= 3 && e.path[2] != speedDialWrapper
                ){
                    this.hideSpeedDialItems()
                }
            })
        },
        
        showSpeedDialItems: function(){
            this.enableItemsTooltips()

            const items = this.getSpeedDialItems()
            for(let i = 0; i < items.length; i++){
                items[i].style.bottom = `${ICONS_MARGIN * (i + 1)}px`
            }

            // Wait until the animation ends to open the tooltips
            setTimeout(() => {
                const tooltipsKeys = Object.keys(tooltips)
                for(let i = 0; i < tooltipsKeys.length; i++){
                    const key = tooltipsKeys[i]
                    tooltips[key].show()
                }
            }, ANIMATION_DURATION)
    
            isOpened = true
        },
        
        hideSpeedDialItems: function(){
            const items = this.getSpeedDialItems()
        
            for(let i = 0; i < items.length; i++){
                items[i].style.bottom = `0px`
            }

            isOpened = false
            this.disableItemsTooltips()
        },
        
        enableItemsTooltips: function(){
            setTimeout(() => {
                const tooltipsKeys = Object.keys(tooltips)

                // If already configured
                if(tooltipsKeys.length){
                    if(!isOpened) return

                    for(let i = 0; i < tooltipsKeys.length; i++){
                        const key = tooltipsKeys[i]
                        tooltips[key].enable()
                    }
                }
                else{	
                    const speedDialItems = this.getSpeedDialItems()
                    const speedDialItemsImgs = this.getSpeedDialItemsImgs()
                    for(let i = 0; i < speedDialItems.length; i++){
                        tooltips[speedDialItemsImgs[i].id] = tippy(speedDialItems[i], {
                            placement: 'right',
                            inlinePositioning: true,
                            content: speedDialItems[i].getAttribute('data-text'),
                        })
                    }
                }
            }, ANIMATION_DURATION - 400);            
        },

        disableItemsTooltips: function(){
            const tooltipsKeys = Object.keys(tooltips)
            for(let i = 0; i < tooltipsKeys.length; i++){
                const key = tooltipsKeys[i]
                tooltips[key].hide()
                tooltips[key].disable()
            }
        },

        hideOtherTooltips: function(element){
            const elementId = element.target.id

            const tooltipsKeys = Object.keys(tooltips)
            for(let i = 0; i < tooltipsKeys.length; i++){
                const key = tooltipsKeys[i]

                if(key != elementId){
                    tooltips[key].hide()
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
        },
        
        openLink: (e) => {
            window.open(e.target.dataset.link).focus()
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