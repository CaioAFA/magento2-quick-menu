<?php
/**
 * Teste
 * Copyright (C) 2019 
 * 
 * This file is part of Caio/QuickMenu.
 * 
 * Caio/QuickMenu is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

namespace Caio\QuickMenu\Model;

use Magento\Framework\Api\DataObjectHelper;
use Caio\QuickMenu\Api\Data\ItemInterfaceFactory;
use Caio\QuickMenu\Api\Data\ItemInterface;

class Item extends \Magento\Framework\Model\AbstractModel
{

    protected $_eventPrefix = 'caio_quickmenu_item';
    protected $itemDataFactory;

    protected $dataObjectHelper;


    /**
     * @param \Magento\Framework\Model\Context $context
     * @param \Magento\Framework\Registry $registry
     * @param ItemInterfaceFactory $itemDataFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param \Caio\QuickMenu\Model\ResourceModel\Item $resource
     * @param \Caio\QuickMenu\Model\ResourceModel\Item\Collection $resourceCollection
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        ItemInterfaceFactory $itemDataFactory,
        DataObjectHelper $dataObjectHelper,
        \Caio\QuickMenu\Model\ResourceModel\Item $resource,
        \Caio\QuickMenu\Model\ResourceModel\Item\Collection $resourceCollection,
        array $data = []
    ) {
        $this->itemDataFactory = $itemDataFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        parent::__construct($context, $registry, $resource, $resourceCollection, $data);
    }

    /**
     * Retrieve item model with item data
     * @return ItemInterface
     */
    public function getDataModel()
    {
        $itemData = $this->getData();
        
        $itemDataObject = $this->itemDataFactory->create();
        $this->dataObjectHelper->populateWithArray(
            $itemDataObject,
            $itemData,
            ItemInterface::class
        );
        
        return $itemDataObject;
    }
}
