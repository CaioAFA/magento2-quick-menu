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

namespace Caio\SpeedDial\Api;

use Magento\Framework\Api\SearchCriteriaInterface;

interface ItemRepositoryInterface
{

    /**
     * Save item
     * @param \Caio\SpeedDial\Api\Data\ItemInterface $item
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function save(
        \Caio\SpeedDial\Api\Data\ItemInterface $item
    );

    /**
     * Retrieve item
     * @param string $itemId
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getById($itemId);

    /**
     * Retrieve item matching the specified criteria.
     * @param \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
     * @return \Caio\SpeedDial\Api\Data\ItemSearchResultsInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
    );

    /**
     * Delete item
     * @param \Caio\SpeedDial\Api\Data\ItemInterface $item
     * @return bool true on success
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function delete(
        \Caio\SpeedDial\Api\Data\ItemInterface $item
    );

    /**
     * Delete item by ID
     * @param string $itemId
     * @return bool true on success
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function deleteById($itemId);
}
