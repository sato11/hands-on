/* @flow */

import React from 'react';
import classNames from 'classnames';

type Props = {
  href: ?string,
  className: ?string,
}

const Button = (props: Object) => {
  const cssclasses = classNames('Button', props.className);
  return props.href
    ? <a { ...props } className={ cssclasses } />
    : <button { ...props } className={ cssclasses } />
}

export default Button
