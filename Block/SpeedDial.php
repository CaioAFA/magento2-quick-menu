<?php
namespace Caio\SpeedDial\Block;

class SpeedDial extends \Magento\Framework\View\Element\Template
{
    protected $itemsCollection;

    /**
     * @var \Magento\Framework\App\Config\ScopeConfigInterface
     */
    protected $scopeConfig;

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Caio\SpeedDial\Model\ResourceModel\Item\Collection $itemsCollection,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
        $this->itemsCollection = $itemsCollection;
    }

    public function getSpeedDialItems(){
        return json_encode($this->itemsCollection->getData());
    }

    public function getSpeedDialConfigurations(){
        $isEnabled = $this->scopeConfig->getValue(
            'speed_dial/general/enable', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        if(!$isEnabled){
            return json_encode([
                'isEnabled' => $isEnabled
            ]);
        }

        $iconSize = $this->scopeConfig->getValue(
            'speed_dial/general/icon_size', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $iconMargin = $this->scopeConfig->getValue(
            'speed_dial/general/icons_margin', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $leftDistance = $this->scopeConfig->getValue(
            'speed_dial/general/left_distance', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        $bottomDistance = $this->scopeConfig->getValue(
            'speed_dial/general/bottom_distance', 
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );

        return json_encode([
            'isEnabled' => $isEnabled,
            'iconSize' => $iconSize,
            'iconsMargin' => $iconMargin,
            'leftDistance' => $leftDistance,
            'bottomDistance' => $bottomDistance,
        ]);
    }
}
