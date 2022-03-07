define([
    'uiComponent',
    'ko',
    'Caio_QuickMenu/js/libs/tippy',
    'jquery'
], function(Component, ko, tippy, $){
    const tooltips = {}

    var ICONS_MARGIN
    const ANIMATION_DURATION = 500 // Milliseconds
    var isOpened = false

    return Component.extend({
        defaults: {
            template: 'Caio_QuickMenu/quickmenu'
        },

        getItems: function(){
            return window.speedDialItems
        },

        isModuleEnabled: function(){
            const isEnabled = window.speedDialConfig.isEnabled != 0 ? true : false
            return isEnabled
        },

        initQuickMenu: function(){
            ICONS_MARGIN = window.speedDialConfig.iconsMargin
            var SPEED_DIAL_ITEMS_HEIGHT = window.speedDialConfig.iconSize
            var SPEED_DIAL_ITEMS_WIDTH = window.speedDialConfig.iconSize
            var SPEED_DIAL_LEFT_DISTANCE = window.speedDialConfig.leftDistance
            var SPEED_DIAL_BOTTOM_DISTANCE = window.speedDialConfig.bottomDistance
            var ICON_IMAGE = window.speedDialConfig.iconImage
            var BACKGROUND_ICON_COLOR = window.speedDialConfig.iconImageBackground

            const items = this.getQuickMenuItems()
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

            const itemsImgs = this.getQuickMenuItemsImgs()
            for(let i = 0; i < itemsImgs.length; i++){
                itemsImgs[i].height = SPEED_DIAL_ITEMS_HEIGHT
                itemsImgs[i].width = SPEED_DIAL_ITEMS_WIDTH
                itemsImgs[i].style.background = itemsImgs[i].getAttribute('data-background') ?? 'white'
                itemsImgs[i].addEventListener('mouseover', (element) => {
                    this.hideOtherTooltips(element)
                })
            }

            const speedDialWrapper = this.getQuickMenuWrapper()
            speedDialWrapper.style.width = `${SPEED_DIAL_ITEMS_WIDTH}px`
            speedDialWrapper.style.right = `${SPEED_DIAL_LEFT_DISTANCE}px`
            speedDialWrapper.style.bottom = `${SPEED_DIAL_BOTTOM_DISTANCE}px`

            const speedDialMainIconImg = this.getQuickMenuMainIconImg()
            speedDialMainIconImg.style.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.style.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.width = SPEED_DIAL_ITEMS_WIDTH
            speedDialMainIconImg.height = SPEED_DIAL_ITEMS_HEIGHT
            speedDialMainIconImg.src = ICON_IMAGE
            speedDialMainIconImg.ontouchstart = (e) => {
                this.toggleQuickMenu()
                e.preventDefault() // Prevent "onclick" event
            }
            this.handleOuterTouchEvent()

            const mainIconWrapper = this.getQuickMenuMainIcon()
            mainIconWrapper.style.background = BACKGROUND_ICON_COLOR
            mainIconWrapper.onclick = () => {
                this.toggleQuickMenu()
            }

            const speedDialItemsWrapper = this.getQuickMenuItemsWrapper()
            speedDialItemsWrapper.style.height = `${ICONS_MARGIN * (items.length + 1)}px`
        },

        // When click away from div in mobile, close the speed dial
        handleOuterTouchEvent: function(){
            window.addEventListener('touchstart', (e) => {
                const speedDialWrapper = this.getQuickMenuWrapper()
                if(
                    e.path && e.path.length && e.path.length >= 3 && e.path[2] != speedDialWrapper
                ){
                    this.hideQuickMenuItems()
                }
            })
        },
        
        showQuickMenuItems: function(){
            this.enableItemsTooltips()

            const items = this.getQuickMenuItems()
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
        
        hideQuickMenuItems: function(){
            const items = this.getQuickMenuItems()
        
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
                    const speedDialItems = this.getQuickMenuItems()
                    const speedDialItemsImgs = this.getQuickMenuItemsImgs()
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

        toggleQuickMenu: function(){
            if(isOpened){
                this.hideQuickMenuItems()
            }
            else{
                this.showQuickMenuItems()
            }
        },
        
        openLink: (e) => {
            window.open(e.target.dataset.link).focus()
        },

        getQuickMenuWrapper: function(){
            return document.getElementById('speed-dial-wrapper')
        },
        
        getQuickMenuItemsWrapper: function(){
            return document.getElementById('speed-dial-items')
        },

        getQuickMenuMainIcon: function(){
            return document.querySelector('#speed-dial-main-icon')
        },

        getQuickMenuMainIconImg: function(){
            return document.querySelector('#speed-dial-main-icon img')
        },
        
        getQuickMenuItems: function(){
            return document.querySelectorAll('.speed-dial-item')
        },
        
        getQuickMenuItemsImgs: function(){
            return document.querySelectorAll('#speed-dial-items .speed-dial-item img')
        },
    });
});