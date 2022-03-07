<?php

namespace Caio\QuickMenu\Ui\Component\Listing\Column;

class Image extends \Magento\Ui\Component\Listing\Columns\Column
{
  const ICON_PATH = 'quickmenu_icon/';

  /**
   * @var \Magento\Store\Model\StoreManagerInterface
   */
  protected $storeManager;

  /**
   * @var \Magento\Framework\View\Asset\Repository
   */
  protected $assetRepo;
  
  public function __construct(
    \Magento\Framework\View\Element\UiComponent\ContextInterface $context,
    \Magento\Framework\View\Element\UiComponentFactory $uiComponentFactory,
    \Magento\Store\Model\StoreManagerInterface $storeManager,
    \Magento\Framework\View\Asset\Repository $assetRepo,
    array $components = [],
    array $data = []
  ) {
    parent::__construct($context, $uiComponentFactory, $components, $data);
    $this->storeManager = $storeManager;
    $this->assetRepo = $assetRepo;
  }

  public function prepareDataSource(array $dataSource)
  {
    $currentStore = $this->storeManager->getStore();
    $mediaPath = $currentStore->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);

    if (isset($dataSource['data']['items'])) {
      foreach ($dataSource['data']['items'] as &$item) {
        if (isset($item['image']) && $item['image']) {
          $i = json_decode($item['image'], true);
          $image = $i[0]['name'];

          $imagePath = $mediaPath . self::ICON_PATH . $image;
          $item['image'] = $imagePath;
          $item['image_src'] = $imagePath;
          $item['image_orig_src'] = $imagePath;
        }
        else{
          // Default image
          $item['image'] = $this->assetRepo->getUrl("Caio_QuickMenu::image/sample_icon.png");
          $item['image_src'] = $this->assetRepo->getUrl("Caio_QuickMenu::image/sample_icon.png");
          $item['image_orig_src'] = $this->assetRepo->getUrl("Caio_QuickMenu::image/sample_icon.png");
        }
      }
    }

    return $dataSource;
  }
}
