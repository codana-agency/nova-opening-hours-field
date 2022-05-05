<?php

namespace SadekD\NovaOpeningHoursField;

use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class NovaOpeningHoursField extends Field
{
    public $component = 'nova-opening-hours-field';
    public $placeHolder = "08:00-16:00";

    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = json_decode($request[$requestAttribute], true);
        }
    }

    public function placeholder($text)
    {
        $this->placeholder = $text;
        $this->withMeta(['extraAttributes' => ['placeholder' => $text]]);

        return $this;
    }
}
