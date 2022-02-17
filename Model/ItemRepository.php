<?php
/**
 * Teste
 * Copyright (C) 2019 
 * 
 * This file is part of Caio/SpeedDial.
 * 
 * Caio/SpeedDial is free software: you can redistribute it and/or modify
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

namespace Caio\SpeedDial\Model;

use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Exception\NoSuchEntityException;
use Caio\SpeedDial\Api\Data\ItemInterfaceFactory;
use Magento\Framework\Reflection\DataObjectProcessor;
use Caio\SpeedDial\Api\Data\ItemSearchResultsInterfaceFactory;
use Caio\SpeedDial\Api\ItemRepositoryInterface;
use Caio\SpeedDial\Model\ResourceModel\Item as ResourceItem;
use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Api\ExtensionAttribute\JoinProcessorInterface;
use Magento\Framework\Exception\CouldNotDeleteException;
use Magento\Framework\Api\DataObjectHelper;
use Magento\Framework\Api\ExtensibleDataObjectConverter;
use Magento\Store\Model\StoreManagerInterface;
use Caio\SpeedDial\Model\ResourceModel\Item\CollectionFactory as ItemCollectionFactory;

class ItemRepository implements ItemRepositoryInterface
{

    protected $itemCollectionFactory;

    protected $dataObjectHelper;

    protected $extensibleDataObjectConverter;
    private $collectionProcessor;

    protected $itemFactory;

    protected $dataItemFactory;

    private $storeManager;

    protected $searchResultsFactory;

    protected $resource;

    protected $extensionAttributesJoinProcessor;

    protected $dataObjectProcessor;


    /**
     * @param ResourceItem $resource
     * @param ItemFactory $itemFactory
     * @param ItemInterfaceFactory $dataItemFactory
     * @param ItemCollectionFactory $itemCollectionFactory
     * @param ItemSearchResultsInterfaceFactory $searchResultsFactory
     * @param DataObjectHelper $dataObjectHelper
     * @param DataObjectProcessor $dataObjectProcessor
     * @param StoreManagerInterface $storeManager
     * @param CollectionProcessorInterface $collectionProcessor
     * @param JoinProcessorInterface $extensionAttributesJoinProcessor
     * @param ExtensibleDataObjectConverter $extensibleDataObjectConverter
     */
    public function __construct(
        ResourceItem $resource,
        ItemFactory $itemFactory,
        ItemInterfaceFactory $dataItemFactory,
        ItemCollectionFactory $itemCollectionFactory,
        ItemSearchResultsInterfaceFactory $searchResultsFactory,
        DataObjectHelper $dataObjectHelper,
        DataObjectProcessor $dataObjectProcessor,
        StoreManagerInterface $storeManager,
        CollectionProcessorInterface $collectionProcessor,
        JoinProcessorInterface $extensionAttributesJoinProcessor,
        ExtensibleDataObjectConverter $extensibleDataObjectConverter
    ) {
        $this->resource = $resource;
        $this->itemFactory = $itemFactory;
        $this->itemCollectionFactory = $itemCollectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
        $this->dataObjectHelper = $dataObjectHelper;
        $this->dataItemFactory = $dataItemFactory;
        $this->dataObjectProcessor = $dataObjectProcessor;
        $this->storeManager = $storeManager;
        $this->collectionProcessor = $collectionProcessor;
        $this->extensionAttributesJoinProcessor = $extensionAttributesJoinProcessor;
        $this->extensibleDataObjectConverter = $extensibleDataObjectConverter;
    }

    /**
     * {@inheritdoc}
     */
    public function save(
        \Caio\SpeedDial\Api\Data\ItemInterface $item
    ) {
        /* if (empty($item->getStoreId())) {
            $storeId = $this->storeManager->getStore()->getId();
            $item->setStoreId($storeId);
        } */
        
        $itemData = $this->extensibleDataObjectConverter->toNestedArray(
            $item,
            [],
            \Caio\SpeedDial\Api\Data\ItemInterface::class
        );
        
        $itemModel = $this->itemFactory->create()->setData($itemData);
        
        try {
            $this->resource->save($itemModel);
        } catch (\Exception $exception) {
            throw new CouldNotSaveException(__(
                'Could not save the item: %1',
                $exception->getMessage()
            ));
        }
        return $itemModel->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getById($itemId)
    {
        $item = $this->itemFactory->create();
        $this->resource->load($item, $itemId);
        if (!$item->getId()) {
            throw new NoSuchEntityException(__('item with id "%1" does not exist.', $itemId));
        }
        return $item->getDataModel();
    }

    /**
     * {@inheritdoc}
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $criteria
    ) {
        $collection = $this->itemCollectionFactory->create();
        
        $this->extensionAttributesJoinProcessor->process(
            $collection,
            \Caio\SpeedDial\Api\Data\ItemInterface::class
        );
        
        $this->collectionProcessor->process($criteria, $collection);
        
        $searchResults = $this->searchResultsFactory->create();
        $searchResults->setSearchCriteria($criteria);
        
        $items = [];
        foreach ($collection as $model) {
            $items[] = $model->getDataModel();
        }
        
        $searchResults->setItems($items);
        $searchResults->setTotalCount($collection->getSize());
        return $searchResults;
    }

    /**
     * {@inheritdoc}
     */
    public function delete(
        \Caio\SpeedDial\Api\Data\ItemInterface $item
    ) {
        try {
            $itemModel = $this->itemFactory->create();
            $this->resource->load($itemModel, $item->getItemId());
            $this->resource->delete($itemModel);
        } catch (\Exception $exception) {
            throw new CouldNotDeleteException(__(
                'Could not delete the item: %1',
                $exception->getMessage()
            ));
        }
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function deleteById($itemId)
    {
        return $this->delete($this->getById($itemId));
    }
}
