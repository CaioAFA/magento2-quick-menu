<?php

namespace Caio\SpeedDial\Ui\Component\Listing\Column;

class Image extends \Magento\Ui\Component\Listing\Columns\Column
{
  const ICON_PATH = 'speed_dial_icon/';

  /**
   * @var \Magento\Store\Model\StoreManagerInterface
   */
  protected $storeManager;

  public function __construct(
    \Magento\Framework\View\Element\UiComponent\ContextInterface $context,
    \Magento\Framework\View\Element\UiComponentFactory $uiComponentFactory,
    \Magento\Store\Model\StoreManagerInterface $storeManager,
    array $components = [],
    array $data = []
  ) {
    $this->storeManager = $storeManager;
    parent::__construct($context, $uiComponentFactory, $components, $data);
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
      }
    }

    return $dataSource;
  }
}
