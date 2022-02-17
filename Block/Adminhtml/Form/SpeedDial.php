<?php

namespace Caio\SpeedDial\Block\Adminhtml\Form;

use Magento\Config\Block\System\Config\Form\Field\FieldArray\AbstractFieldArray;

/**
 * Class SpeedDial
 */
class SpeedDial extends AbstractFieldArray
{
  /**
   * {@inheritdoc}
   */
  protected function _prepareToRender()
  {
    $this->addColumn('backgroundColor',
      [
        'label' => __('Cor de Fundo (CSS)'),
        'class' => 'required-entry',
        // 'size' => '40px'
      ]
    );
    
    $this->addColumn('text',
      [
        'label' => __('Texto'),
        'class' => 'required-entry',
        // 'size' => '70px'
      ]
    );

    $this->addColumn('imgLink',
      [
        'label' => __('Link do Ícone'),
        'class' => 'required-entry',
        'size' => '350px'
      ]
    );

    $this->_addAfter = false;
    $this->_addButtonLabel = __('Adicionar ícone');
  }
}
