<?php

namespace Caio\QuickMenu\Cron;

use Magento\Framework\App\Filesystem\DirectoryList;

class DeleteUnusedIconsImages
{
  const ICON_PATH = 'quickmenu_icon/';

  /**
   * @var \Caio\QuickMenu\Model\ResourceModel\Item\Collection
   */
  protected $itemsCollection;

  /**
   * @var \Magento\Framework\Filesystem
   */
  protected $filesystem;

  public function __construct(
    \Caio\QuickMenu\Model\ResourceModel\Item\Collection $itemsCollection,
    \Magento\Framework\Filesystem $filesystem
  ) {
    $this->itemsCollection = $itemsCollection;
    $this->filesystem = $filesystem;
  }

  private function getItems(){
    return $this->itemsCollection->getData();
  }

  private function getUsedImages(){
    $result = [];

    $items = $this->getItems();
    foreach($items as $i){
      $image = json_decode($i['image'], true);

      if($image){
        $result[] = $image[0]['name'];
      }
    }

    return $result;
  }

  private function getIconsMediaPath(){
    $mediapath = $this->filesystem->getDirectoryRead(DirectoryList::MEDIA)->getAbsolutePath();
    $iconsMediaPath = "$mediapath" . self::ICON_PATH;
    return $iconsMediaPath;
  }

  private function getUnusedImages($usedImages){
    $iconsMediaPath = $this->getIconsMediaPath();
    $allImagesAndDirs = array_diff(scandir($iconsMediaPath), array('.', '..'));

    $unused = array_diff($allImagesAndDirs, $usedImages);

    $result = [];
    foreach($unused as $u){
      if(is_file($iconsMediaPath . "/" . $u)){
        $result[] = $u;
      }
    }

    return $result;
  }

  private function removeUnusedImages($unusedImages){
    $iconsMediaPath = $this->getIconsMediaPath();

    foreach($unusedImages as $u){
      unlink($iconsMediaPath . $u);
    }
  }

  public function execute()
  {
    $usedImages = $this->getUsedImages();
    $unusedImages = $this->getUnusedImages($usedImages);
    $this->removeUnusedImages($unusedImages);

    return $this;
  }
}
