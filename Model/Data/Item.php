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

namespace Caio\QuickMenu\Model\Data;

use Caio\QuickMenu\Api\Data\ItemInterface;

class Item extends \Magento\Framework\Api\AbstractExtensibleObject implements ItemInterface
{

    /**
     * Get item_id
     * @return string|null
     */
    public function getItemId()
    {
        return $this->_get(self::ITEM_ID);
    }

    /**
     * Set item_id
     * @param string $itemId
     * @return \Caio\QuickMenu\Api\Data\ItemInterface
     */
    public function setItemId($itemId)
    {
        return $this->setData(self::ITEM_ID, $itemId);
    }

    /**
     * Get background
     * @return string|null
     */
    public function getBackground()
    {
        return $this->_get(self::BACKGROUND);
    }

    /**
     * Set background
     * @param string $background
     * @return \Caio\QuickMenu\Api\Data\ItemInterface
     */
    public function setBackground($background)
    {
        return $this->setData(self::BACKGROUND, $background);
    }

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Caio\QuickMenu\Api\Data\ItemExtensionInterface|null
     */
    public function getExtensionAttributes()
    {
        return $this->_getExtensionAttributes();
    }

    /**
     * Set an extension attributes object.
     * @param \Caio\QuickMenu\Api\Data\ItemExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Caio\QuickMenu\Api\Data\ItemExtensionInterface $extensionAttributes
    ) {
        return $this->_setExtensionAttributes($extensionAttributes);
    }

    /**
     * Get image_link
     * @return string|null
     */
    public function getImageLink()
    {
        return $this->_get(self::IMAGE_LINK);
    }

    /**
     * Set image_link
     * @param string $imageLink
     * @return \Caio\QuickMenu\Api\Data\ItemInterface
     */
    public function setImageLink($imageLink)
    {
        return $this->setData(self::IMAGE_LINK, $imageLink);
    }

    /**
     * Get redirect_link
     * @return string|null
     */
    public function getRedirectLink()
    {
        return $this->_get(self::REDIRECT_LINK);
    }

    /**
     * Set redirect_link
     * @param string $redirectLink
     * @return \Caio\QuickMenu\Api\Data\ItemInterface
     */
    public function setRedirectLink($redirectLink)
    {
        return $this->setData(self::REDIRECT_LINK, $redirectLink);
    }

    /**
     * Get text
     * @return string|null
     */
    public function getText()
    {
        return $this->_get(self::TEXT);
    }

    /**
     * Set text
     * @param string $text
     * @return \Caio\QuickMenu\Api\Data\ItemInterface
     */
    public function setText($text)
    {
        return $this->setData(self::TEXT, $text);
    }
}
