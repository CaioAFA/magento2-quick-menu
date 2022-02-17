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

namespace Caio\SpeedDial\Api\Data;

interface ItemInterface extends \Magento\Framework\Api\ExtensibleDataInterface
{

    const IMAGE_LINK = 'image_link';
    const TEXT = 'text';
    const BACKGROUND = 'background';
    const REDIRECT_LINK = 'redirect_link';
    const ITEM_ID = 'item_id';

    /**
     * Get item_id
     * @return string|null
     */
    public function getItemId();

    /**
     * Set item_id
     * @param string $itemId
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     */
    public function setItemId($itemId);

    /**
     * Get background
     * @return string|null
     */
    public function getBackground();

    /**
     * Set background
     * @param string $background
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     */
    public function setBackground($background);

    /**
     * Retrieve existing extension attributes object or create a new one.
     * @return \Caio\SpeedDial\Api\Data\ItemExtensionInterface|null
     */
    public function getExtensionAttributes();

    /**
     * Set an extension attributes object.
     * @param \Caio\SpeedDial\Api\Data\ItemExtensionInterface $extensionAttributes
     * @return $this
     */
    public function setExtensionAttributes(
        \Caio\SpeedDial\Api\Data\ItemExtensionInterface $extensionAttributes
    );

    /**
     * Get image_link
     * @return string|null
     */
    public function getImageLink();

    /**
     * Set image_link
     * @param string $imageLink
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     */
    public function setImageLink($imageLink);

    /**
     * Get redirect_link
     * @return string|null
     */
    public function getRedirectLink();

    /**
     * Set redirect_link
     * @param string $redirectLink
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     */
    public function setRedirectLink($redirectLink);

    /**
     * Get text
     * @return string|null
     */
    public function getText();

    /**
     * Set text
     * @param string $text
     * @return \Caio\SpeedDial\Api\Data\ItemInterface
     */
    public function setText($text);
}
