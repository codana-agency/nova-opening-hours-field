<?php

namespace SadekD\NovaOpeningHoursField;

use Illuminate\Validation\ValidationException;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;
use Spatie\OpeningHours\Exceptions\Exception as OpeningHoursException;
use Spatie\OpeningHours\OpeningHours;

class NovaOpeningHoursField extends Field
{
    public $component = 'nova-opening-hours-field';

    public function __construct($name, $attribute = null, $resolveCallback = null)
    {
        parent::__construct($name, $attribute, $resolveCallback);

        $this->allowExceptions();
    }

    protected function fillAttributeFromRequest(NovaRequest $request, $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $value = json_decode($request[$requestAttribute], TRUE);

            try {
                OpeningHours::create($value);
            } catch (OpeningHoursException $exception) {
                throw ValidationException::withMessages([$requestAttribute => $exception->getMessage()]);
            }

            $model->{$attribute} = $this->isNullValue($request[$requestAttribute]) ? NULL : $value;
        }
    }

    public function allowExceptions(bool $allowExceptions = TRUE)
    {
        return $this->withMeta(['allowExceptions' => $allowExceptions]);
    }
}
