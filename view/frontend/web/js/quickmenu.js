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
            return window.quickMenuItems
        },

        isModuleEnabled: function(){
            const isEnabled = window.quickMenuConfig.isEnabled != 0 ? true : false
            return isEnabled
        },

        initQuickMenu: function(){
            ICONS_MARGIN = window.quickMenuConfig.iconsMargin
            var QUICK_MENU_ITEMS_HEIGHT = window.quickMenuConfig.iconSize
            var QUICK_MENU_ITEMS_WIDTH = window.quickMenuConfig.iconSize
            var QUICK_MENU_LEFT_DISTANCE = window.quickMenuConfig.leftDistance
            var QUICK_MENU_BOTTOM_DISTANCE = window.quickMenuConfig.bottomDistance
            var ICON_IMAGE = window.quickMenuConfig.iconImage
            var BACKGROUND_ICON_COLOR = window.quickMenuConfig.iconImageBackground

            const items = this.getQuickMenuItems()
            for(let i = 0; i < items.length; i++){
                items[i].style.height = `${QUICK_MENU_ITEMS_HEIGHT}px`
                items[i].style.width = `${QUICK_MENU_ITEMS_WIDTH}px`
                items[i].style.cursor = 'unset'
                items[i].addEventListener('click', (e) => {
                    this.openLink(e)
                })
                items[i].addEventListener('touchstart', (e) => {
                    this.openLink(e)
                })
            }

            const itemsImgs = this.getQuickMenuItemsImgs()
            for(let i = 0; i < itemsImgs.length; i++){
                itemsImgs[i].height = QUICK_MENU_ITEMS_HEIGHT
                itemsImgs[i].width = QUICK_MENU_ITEMS_WIDTH
                itemsImgs[i].style.background = itemsImgs[i].getAttribute('data-background') ?? 'white'
                itemsImgs[i].addEventListener('mouseover', (element) => {
                    this.hideOtherTooltips(element)
                })
            }

            const quickMenuWrapper = this.getQuickMenuWrapper()
            quickMenuWrapper.style.width = `${QUICK_MENU_ITEMS_WIDTH}px`
            quickMenuWrapper.style.right = `${QUICK_MENU_LEFT_DISTANCE}px`
            quickMenuWrapper.style.bottom = `${QUICK_MENU_BOTTOM_DISTANCE}px`

            const quickMenuMainIconImg = this.getQuickMenuMainIconImg()
            quickMenuMainIconImg.style.width = QUICK_MENU_ITEMS_WIDTH
            quickMenuMainIconImg.style.height = QUICK_MENU_ITEMS_HEIGHT
            quickMenuMainIconImg.width = QUICK_MENU_ITEMS_WIDTH
            quickMenuMainIconImg.height = QUICK_MENU_ITEMS_HEIGHT
            quickMenuMainIconImg.src = ICON_IMAGE
            quickMenuMainIconImg.ontouchstart = (e) => {
                this.toggleQuickMenu()
                e.preventDefault() // Prevent "onclick" event
            }
            this.handleOuterTouchEvent()

            const mainIconWrapper = this.getQuickMenuMainIcon()
            mainIconWrapper.style.background = BACKGROUND_ICON_COLOR
            mainIconWrapper.onclick = () => {
                this.toggleQuickMenu()
            }

            const quickMenuItemsWrapper = this.getQuickMenuItemsWrapper()
            quickMenuItemsWrapper.style.height = `${ICONS_MARGIN * (items.length + 1)}px`
        },

        // When click away from div in mobile, close the quick menu
        handleOuterTouchEvent: function(){
            window.addEventListener('touchstart', (e) => {
                const quickMenuWrapper = this.getQuickMenuWrapper()
                if(
                    e.path && e.path.length && e.path.length >= 3 && e.path[2] != quickMenuWrapper
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
                items[i].style.cursor = 'pointer'
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
                items[i].style.cursor = 'unset'
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
                    const quickMenuItems = this.getQuickMenuItems()
                    const quickMenuItemsImgs = this.getQuickMenuItemsImgs()
                    for(let i = 0; i < quickMenuItems.length; i++){
                        tooltips[quickMenuItemsImgs[i].id] = tippy(quickMenuItems[i], {
                            placement: 'right',
                            inlinePositioning: true,
                            content: quickMenuItems[i].getAttribute('data-text'),
                        })
                    }
                }
            }, ANIMATION_DURATION);            
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
            return document.getElementById('quick-menu-wrapper')
        },
        
        getQuickMenuItemsWrapper: function(){
            return document.getElementById('quick-menu-items')
        },

        getQuickMenuMainIcon: function(){
            return document.querySelector('#quick-menu-main-icon')
        },

        getQuickMenuMainIconImg: function(){
            return document.querySelector('#quick-menu-main-icon img')
        },
        
        getQuickMenuItems: function(){
            return document.querySelectorAll('.quick-menu-item')
        },
        
        getQuickMenuItemsImgs: function(){
            return document.querySelectorAll('#quick-menu-items .quick-menu-item img')
        },
    });
});