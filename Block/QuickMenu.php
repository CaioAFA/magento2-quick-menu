<?php

namespace Caio\QuickMenu\Block;

class QuickMenu extends \Magento\Framework\View\Element\Template
{
    const IMAGES_PATH = 'quickmenu_icon/';

    protected $itemsCollection;

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    /**
     * @var \Magento\Store\Model\StoreManagerInterface
     */
    protected $storeManager;

    /**
     * @var \Magento\Framework\View\Asset\Repository
     */
    protected $assetRepo;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Caio\QuickMenu\Model\ResourceModel\Item\Collection $itemsCollection,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\View\Asset\Repository $assetRepo,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
        $this->itemsCollection = $itemsCollection;
        $this->storeManager = $storeManager;
        $this->assetRepo = $assetRepo;
    }

    public function getQuickMenuItems(){
        $this->itemsCollection->setOrder('position');
        
        $items = $this->itemsCollection->getData();

        $currentStore = $this->storeManager->getStore();
        $mediaPath = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);

        foreach($items as &$i){
            if(!isset($i['image'])){
                $defaultImage = $this->assetRepo->getUrl("Caio_QuickMenu::image/sample_icon.png");
                $i['image'] = $defaultImage;
            }
            else{
                $imgInfo = json_decode($i['image'], true);
                $i['image'] = $mediaPath . self::IMAGES_PATH . $imgInfo[0]['name'];
            }

            if(!$i['background']){
                $i['background'] = 'transparent';
            }
        }

        return json_encode($items);
    }

    public function getQuickMenuConfigurations(){
        $isEnabled = $this->scopeConfig->getValue(
            'quickmenu/general/enable', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        if(!$isEnabled){
            return json_encode([
                'isEnabled' => $isEnabled
            ]);
        }

        $iconSize = $this->scopeConfig->getValue(
            'quickmenu/general/icon_size', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $iconMargin = $this->scopeConfig->getValue(
            'quickmenu/general/icons_margin', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $leftDistance = $this->scopeConfig->getValue(
            'quickmenu/general/left_distance', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $bottomDistance = $this->scopeConfig->getValue(
            'quickmenu/general/bottom_distance', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $iconImage = $this->scopeConfig->getValue(
            'quickmenu/general/icon_image', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $currentStore = $this->storeManager->getStore();
        $mediaPath = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);

        if($iconImage){
            $iconImageFullPath = $mediaPath . $iconImage;
        }
        else{
            $iconImageFullPath = $this->assetRepo->getUrl("Caio_QuickMenu::image/sample_icon.png");;
        }

        $iconImageBackground = $this->scopeConfig->getValue(
            'quickmenu/general/background_icon_color', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        return json_encode([
            'isEnabled' => $isEnabled,
            'iconSize' => $iconSize,
            'iconsMargin' => $iconMargin,
            'leftDistance' => $leftDistance,
            'bottomDistance' => $bottomDistance,
            'iconImage' => $iconImageFullPath,
            'iconImageBackground' => $iconImageBackground,
            'mediaPath' => $mediaPath
        ]);
    }
}
