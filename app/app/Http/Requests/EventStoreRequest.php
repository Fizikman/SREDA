<?php

namespace App\Http\Requests;

use App\Models\Event;
use Illuminate\Foundation\Http\FormRequest;

class EventStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required',
            'description' => 'required',
            'time' => 'string|min:5|max:5|required|regex:/[0-2][0-9]:[0-5][0-9]/i',
            'location' => 'required',
            'type' => 'required|in:'. implode(',', Event::TYPE_EVENTS),
        ];
    }
}
