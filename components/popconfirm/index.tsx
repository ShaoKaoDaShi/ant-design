import React from 'react';
import Tooltip, { AbstractTooltipProps }  from '../tooltip';
import Icon from '../icon';
import Button from '../button';
import { ButtonType } from '../button/button';
import injectLocale from '../locale-provider/injectLocale';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode;
  onConfirm?: (e: React.MouseEvent<any>) => void;
  onCancel?: (e: React.MouseEvent<any>) => void;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
}

abstract class Popconfirm extends React.Component<PopconfirmProps, any> {
  static defaultProps = {
    prefixCls: 'ant-popover',
    transitionName: 'zoom-big',
    placement: 'top',
    trigger: 'click',
    okType: 'primary',
  };

  refs: {
    tooltip: Tooltip,
  };

  constructor(props: PopconfirmProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  abstract getLocale();

  componentWillReceiveProps(nextProps: PopconfirmProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  getPopupDomNode() {
    return this.refs.tooltip.getPopupDomNode();
  }

  onConfirm = (e) => {
    this.setVisible(false);

    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm.call(this, e);
    }
  }

  onCancel = (e) => {
    this.setVisible(false);

    const { onCancel } = this.props;
    if (onCancel) {
      onCancel.call(this, e);
    }
  }

  onVisibleChange = (visible) => {
    this.setVisible(visible);
  }

  setVisible(visible) {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({ visible });
    }

    const { onVisibleChange } = props;
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  }

  render() {
    const { prefixCls, title, placement, okText, okType, cancelText, ...restProps } = this.props;
    const popconfirmLocale = this.getLocale();

    const overlay = (
      <div>
        <div className={`${prefixCls}-inner-content`}>
          <div className={`${prefixCls}-message`}>
            <Icon type="exclamation-circle" />
            <div className={`${prefixCls}-message-title`}>{title}</div>
          </div>
          <div className={`${prefixCls}-buttons`}>
            <Button onClick={this.onCancel} size="small">
              {cancelText || popconfirmLocale.cancelText}
            </Button>
            <Button onClick={this.onConfirm} type={okType} size="small">
              {okText || popconfirmLocale.okText}
            </Button>
          </div>
        </div>
      </div>
    );

    return (
      <Tooltip
        {...restProps}
        prefixCls={prefixCls}
        placement={placement}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        overlay={overlay}
        ref="tooltip"
      />
    );
  }
}

const injectPopconfirmLocale = injectLocale('Popconfirm', {
  cancelText: '??????',
  okText: '??????',
});
export default injectPopconfirmLocale<PopconfirmProps>(Popconfirm as any);
