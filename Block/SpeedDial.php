<?php
namespace Caio\SpeedDial\Block;

class SpeedDial extends \Magento\Framework\View\Element\Template
{
    protected $itemsCollection;
    
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Caio\SpeedDial\Model\ResourceModel\Item\Collection $itemsCollection,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->itemsCollection = $itemsCollection;
    }

    public function getSpeedDialItems(){
        return json_encode($this->itemsCollection->getData());
    }
}
