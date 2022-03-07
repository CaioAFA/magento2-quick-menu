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

namespace Caio\QuickMenu\Controller\Adminhtml\Item;

class Edit extends \Caio\QuickMenu\Controller\Adminhtml\Item
{

    protected $resultPageFactory;

    /**
     * @param \Magento\Backend\App\Action\Context $context
     * @param \Magento\Framework\Registry $coreRegistry
     * @param \Magento\Framework\View\Result\PageFactory $resultPageFactory
     */
    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\Registry $coreRegistry,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory
    ) {
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context, $coreRegistry);
    }

    /**
     * Edit action
     *
     * @return \Magento\Framework\Controller\ResultInterface
     */
    public function execute()
    {
        // 1. Get ID and create model
        $id = $this->getRequest()->getParam('item_id');
        $model = $this->_objectManager->create(\Caio\QuickMenu\Model\Item::class);
        
        // 2. Initial checking
        if ($id) {
            $model->load($id);
            if (!$model->getId()) {
                $this->messageManager->addErrorMessage(__('This Item no longer exists.'));
                /** @var \Magento\Backend\Model\View\Result\Redirect $resultRedirect */
                $resultRedirect = $this->resultRedirectFactory->create();
                return $resultRedirect->setPath('*/*/');
            }
        }

        // $model->setImage(json_decode($model->getImage()));

        // $jsonSerializer = $this->_objectManager->create('\Magento\Framework\Serialize\Serializer\Json');
        // $model->setImage($jsonSerializer->unserialize($model->getImage()));

        $data = $model->getData();
        $this->_coreRegistry->register('caio_quickmenu_item', $data);
        
        // 3. Build edit form
        /** @var \Magento\Backend\Model\View\Result\Page $resultPage */
        $resultPage = $this->resultPageFactory->create();
        $this->initPage($resultPage)->addBreadcrumb(
            $id ? __('Edit Item') : __('New Item'),
            $id ? __('Edit Item') : __('New Item')
        );
        $resultPage->getConfig()->getTitle()->prepend(__('Items'));
        $resultPage->getConfig()->getTitle()->prepend($model->getId() ? __('Edit Item %1', $model->getId()) : __('New Item'));
        return $resultPage;
    }
}
